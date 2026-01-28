"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import PropertiesFilter from "@/components/properties/PropertiesFilter";
import PropertyGrid from "@/components/main/PropertyGrid";
import ViewToggle from "@/components/admin/properties/ViewToggle";
import SelectFilter from "@/components/admin/properties/SelectFilter";
import {
  IProperty,
  PropertyFilters,
  PropertyType,
  PropertyStatus,
  SortOption,
  SortOptionItem,
} from "../types/Properties";
import { AMENITY_ICONS } from "../utils/icons";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  ArrowDown10,
  ArrowDownAZ,
  ArrowUp01,
  ArrowUpZA,
  CalendarPlus,
  Filter,
  X,
} from "lucide-react";

const sortOptions: SortOptionItem[] = [
  {
    value: "createdAt:desc",
    label: "Newest",
    icon: <CalendarPlus size={15} strokeWidth={1} />,
  },
  {
    value: "title:asc",
    label: "Alphabetical",
    icon: <ArrowDownAZ size={15} strokeWidth={1} />,
  },
  {
    value: "title:desc",
    label: "Reverse",
    icon: <ArrowUpZA size={15} strokeWidth={1} />,
  },
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
  // Parse URL search params
  // ----------------------
  useEffect(() => {
    const urlFilters: PropertyFilters = {};

    const title = searchParams.get("title");
    const location = searchParams.get("location");
    const propertyTypeParam = searchParams.get("propertyType");
    const statusParam = searchParams.get("status");
    const maxPrice = searchParams.get("maxPrice");
    const amenities = searchParams.get("amenities");
    const page = Number(searchParams.get("page") || 1);
    const sort = (searchParams.get("sortBy") as SortOption) || "createdAt:desc";

    if (title) urlFilters.title = title;
    if (location) urlFilters.location = location;
    if (propertyTypeParam && propertyTypeParam !== "all")
      urlFilters.propertyType = propertyTypeParam as PropertyType;
    if (statusParam && statusParam !== "all")
      urlFilters.status = statusParam as PropertyStatus;
    if (maxPrice) urlFilters.maxPrice = Number(maxPrice);
    if (amenities) urlFilters.amenities = amenities.split(",");

    setFilters(urlFilters);
    setCurrentPage(page);
    setSortBy(sort);
  }, [searchParams]);

  // ----------------------
  // Fetch properties with caching
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

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  // ----------------------
  // Sync URL with state
  // ----------------------
  useEffect(() => {
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

    const newUrl = `/properties?${params}`;
    if (newUrl !== window.location.pathname + window.location.search) {
      router.replace(newUrl);
    }
  }, [filters, currentPage, sortBy, router]);

  // ----------------------
  // AOS initialization
  // ----------------------
  useEffect(() => {
    AOS.init({ duration: 600, easing: "ease-out", once: true, offset: 50 });
  }, []);

  // ----------------------
  // Handle filter changes
  // ----------------------
  const handleFilterChange = useCallback((newFilters: PropertyFilters) => {
    setCurrentPage(1);
    setFilters(newFilters);
  }, []);

  const totalPages = useMemo(
    () => Math.ceil(totalItems / pageSize),
    [totalItems],
  );

  return (
    <section className="relative max-w-7xl mx-auto py-10 flex flex-col lg:flex-row gap-6">
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <button
              className="flex items-center gap-2 xl:hidden bg-purple-700 text-white px-5 py-3 text-lg rounded-lg hover:bg-purple-800 transition"
              onClick={() => setMobileFilterOpen(true)}
            >
              Filter
              <Filter size={15} strokeWidth={1} />
            </button>
            <SelectFilter<SortOption>
              value={sortBy}
              onChange={setSortBy}
              placeholder="Sort By"
              options={sortOptions}
            />
          </div>
          <div className="hidden xl:block">
            <ViewToggle view={view} setView={setView} />
          </div>
        </div>

        <PropertyGrid
          properties={properties}
          loading={loading}
          currentPage={currentPage}
          totalItems={totalItems}
          pageSize={pageSize}
          onPageChange={(page) =>
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

      {/* Mobile Filter Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-100 bg-white z-50 transform transition-transform duration-300 shadow-lg ${
          mobileFilterOpen ? "translate-x-0" : "translate-x-full"
        }`}
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
                setMobileFilterOpen(false);
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