"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import PropertiesFilter from "@/components/properties/PropertiesFilter";
import PropertyGrid from "@/components/main/PropertyGrid";
import {
  IProperty,
  PropertyFilters,
  PropertyTypeOption,
  PropertyStatusOption,
  PropertyType,
  PropertyStatus,
  SortOptionItem,
  SortOption,
} from "../types/Properties";
import { AMENITY_ICONS } from "../utils/icons";
import ViewToggle from "@/components/admin/properties/ViewToggle";
import SelectFilter from "@/components/admin/properties/SelectFilter";
import AOS from "aos";
import "aos/dist/aos.css";
import { ArrowDown10, ArrowDownAZ, ArrowUp01, ArrowUpZA, Calendar, CalendarPlus, CalendarRange, Filter, X } from "lucide-react";

const sortOptions: SortOptionItem[] = [
  {
    value: "createdAt:desc",
    label: "Newest",
    icon: <CalendarPlus size={15} strokeWidth={1} />,
  },
  { value: "title:asc", label: "Alphabetical", icon: <ArrowDownAZ size={15} strokeWidth={1} /> },
  { value: "title:desc", label: "Reverse", icon: <ArrowUpZA size={15} strokeWidth={1} /> },
  {
    value: "price:asc",
    label: "Price Low",
    icon: <ArrowUp01 size={15} strokeWidth={1} />,
  },
  {
    value: "price:desc",
    label: "Price High",
    icon: <ArrowDown10 size={15} strokeWidth={1} />,
  },
];

export default function PropertiesPageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // ----------------------
  // State
  // ----------------------
  const [filters, setFilters] = useState<PropertyFilters>({});
  const [properties, setProperties] = useState<IProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [sortBy, setSortBy] = useState<SortOption>("createdAt:desc");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const pageSize = 12;

  // ----------------------
  // Client-side cache
  // ----------------------
  const cacheRef = useRef<
    Record<string, { items: IProperty[]; total: number }>
  >({});

  // ----------------------
  // Parse URL search params in a type-safe way
  // ----------------------
  useEffect(() => {
    const urlFilters: PropertyFilters = {};

    const title = searchParams.get("title");
    if (title) urlFilters.title = title;

    const location = searchParams.get("location");
    if (location) urlFilters.location = location;

    const propertyTypeParam = searchParams.get("propertyType");
    if (propertyTypeParam && propertyTypeParam !== "all") {
      urlFilters.propertyType = propertyTypeParam as PropertyType;
    }

    const statusParam = searchParams.get("status");
    if (statusParam && statusParam !== "all") {
      urlFilters.status = statusParam as PropertyStatus;
    }

    const maxPrice = searchParams.get("maxPrice");
    if (maxPrice) urlFilters.maxPrice = Number(maxPrice);

    const amenities = searchParams.get("amenities");
    if (amenities) urlFilters.amenities = amenities.split(",");

    const page = Number(searchParams.get("page") || 1);
    const sort = (searchParams.get("sortBy") as SortOption) || "createdAt:desc";

    setFilters(urlFilters);
    setCurrentPage(page);
    setSortBy(sort);
  }, [searchParams]);

  // ----------------------
  // Fetch properties (with cache)
  // ----------------------
  const fetchProperties = useCallback(async () => {
    setLoading(true);

    const queryObj = {
      page: currentPage.toString(),
      pageSize: pageSize.toString(),
      sortBy,
      ...(filters.title && { title: filters.title }),
      ...(filters.location && { location: filters.location }),
      ...(filters.propertyType && { propertyType: filters.propertyType }),
      ...(filters.status && { status: filters.status }),
      ...(filters.maxPrice && { maxPrice: filters.maxPrice.toString() }),
      ...(filters.amenities && { amenities: filters.amenities.join(",") }),
    };

    const cacheKey = JSON.stringify(queryObj);

    // Return cached if available
    if (cacheRef.current[cacheKey]) {
      const cached = cacheRef.current[cacheKey];
      setProperties(cached.items);
      setTotalItems(cached.total);
      setLoading(false);
      return;
    }

    try {
      const query = new URLSearchParams(queryObj);
      const res = await fetch(`/api/properties?${query}`);
      const data = await res.json();

      setProperties(data.properties || []);
      setTotalItems(data.total || 0);

      // Cache the result
      cacheRef.current[cacheKey] = {
        items: data.properties || [],
        total: data.total || 0,
      };
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [filters, currentPage, sortBy, pageSize]);

  // ----------------------
  // Fetch + Sync URL
  // ----------------------
  useEffect(() => {
    fetchProperties();

    // Sync URL without reload (type-safe)
    const params = new URLSearchParams({
      page: currentPage.toString(),
      sortBy,
      ...(filters.title && { title: filters.title }),
      ...(filters.location && { location: filters.location }),
      ...(filters.propertyType && { propertyType: filters.propertyType }),
      ...(filters.status && { status: filters.status }),
      ...(filters.maxPrice && { maxPrice: filters.maxPrice.toString() }),
      ...(filters.amenities && { amenities: filters.amenities.join(",") }),
    });

    router.replace(`/properties?${params}`);
  }, [filters, currentPage, sortBy, fetchProperties, router]);

  // AOS 
    useEffect(() => {
      AOS.init({
        duration: 600, // animation duration
        easing: "ease-out",
        once: true, // only animate once
        offset: 50,
      });
    }, []);

  // ----------------------
  // Handle filter changes
  // ----------------------
  const handleFilterChange = useCallback((newFilters: PropertyFilters) => {
    setCurrentPage(1); // Reset page on filter change
    setFilters(newFilters);
  }, []);

  // ----------------------
  // Derived: total pages (type-safe)
  // ----------------------
  const totalPages = useMemo(
    () => Math.ceil(totalItems / pageSize),
    [totalItems],
  );

  return (
    <section className="relative max-w-7xl mx-auto px-5 py-10 flex flex-col lg:flex-row gap-6">
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <button
              className="flex items-center gap-2 xl:hidden bg-purple-700 text-white px-5 py-3  text-lg rounded-lg hover:bg-purple-800 transition"
              onClick={() => setMobileFilterOpen(true)}
            >
              Filter
              <Filter size={15} strokeWidth={1} />
            </button>
            <SelectFilter<SortOption>
              value={sortBy}
              onChange={(val) => setSortBy(val)}
              placeholder="Sort By"
              options={sortOptions}
            />
          </div>
          <ViewToggle view={view} setView={setView} />
        </div>

        <PropertyGrid
          properties={properties}
          loading={loading}
          currentPage={currentPage}
          totalItems={totalItems}
          pageSize={pageSize}
          onPageChange={(page: number) =>
            setCurrentPage(Math.min(Math.max(1, page), totalPages))
          }
          view={view}
        />
      </div>

      <aside className="hidden xl:block xl:w-80 self-start sticky top-20">
        <PropertiesFilter
          onChange={handleFilterChange}
          amenities={Object.keys(AMENITY_ICONS)}
        />
      </aside>

      {/* Mobile filter drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-100 bg-white z-50 transform transition-transform duration-300 shadow-lg
          ${mobileFilterOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-5 flex flex-col h-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Filters</h2>
            <button
              onClick={() => setMobileFilterOpen(false)}
              className="text-gray-500 hover:text-gray-800 transition"
            >
              <X size={18} strokeWidth={1} />
            </button>
          </div>

          <div className="overflow-y-auto flex-1">
            <PropertiesFilter
              onChange={(f) => {
                handleFilterChange(f);
                setMobileFilterOpen(false); // auto-close after filter
              }}
              amenities={Object.keys(AMENITY_ICONS)}
            />
          </div>
        </div>
      </div>

      {/* Overlay */}
      {mobileFilterOpen && (
        <div
          className="fixed inset-0 backdrop-blur-xs bg-white/30 z-40"
          onClick={() => setMobileFilterOpen(false)}
        />
      )}
    </section>
  );
}