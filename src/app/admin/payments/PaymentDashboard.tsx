"use client";

import Link from "next/link";

const PAYSTACK_DASHBOARD_URL = "https://dashboard.paystack.com";

const PaymentDashboard = () => {
  return (
    <div className="space-y-10">
      {/* Top Notification */}
      <div className="rounded-xl border border-green-700 bg-green-100 p-5 flex gap-4 items-start">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-700 text-white font-semibold">
          ₦
        </div>

        <div>
          <h2 className="font-semibold text-gray-900">
            Payment processing via Paystack
          </h2>
          <p className="text-md text-gray-500 mt-1">
            All payment processing, transactions, management, and financial
            reporting are handled through Paystack’s secure platform. Click the
            links below to access Paystack’s dashboard.
          </p>
        </div>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Main Dashboard */}
        <div className="rounded-xl bg-white p-5 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-1">Main Dashboard</h3>
            <p className="text-md text-gray-500">
              View your overall payment statistics and insights.
            </p>
          </div>

          <Link
            href={PAYSTACK_DASHBOARD_URL}
            target="_blank"
            className="mt-4 inline-flex items-center text-md font-medium text-green-600 hover:underline"
          >
            Open Paystack Dashboard →
          </Link>
        </div>

        {/* Transactions */}
        <div className="rounded-xl bg-white p-5 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-1">Transactions</h3>
            <p className="text-md text-gray-500">
              View, search and manage all payment transactions.
            </p>
          </div>

          <Link
            href={`${PAYSTACK_DASHBOARD_URL}/#/transactions`}
            target="_blank"
            className="mt-4 inline-flex items-center text-md font-medium text-green-600 hover:underline"
          >
            View Transactions →
          </Link>
        </div>

        {/* Customers */}
        <div className="rounded-xl bg-white p-5 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-1">Customers</h3>
            <p className="text-md text-gray-500">
              Manage customer payment information and transaction history.
            </p>
          </div>

          <Link
            href={`${PAYSTACK_DASHBOARD_URL}/#/customers`}
            target="_blank"
            className="mt-4 inline-flex items-center text-md font-medium text-green-600 hover:underline"
          >
            Manage Customers →
          </Link>
        </div>

        {/* Settlements */}
        <div className="rounded-xl bg-white p-5 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-1">Settlements</h3>
            <p className="text-md text-gray-500">
              Track your settlements and payout schedules.
            </p>
          </div>

          <Link
            href={`${PAYSTACK_DASHBOARD_URL}/#/settlements`}
            target="_blank"
            className="mt-4 inline-flex items-center text-md font-medium text-green-600 hover:underline"
          >
            View Settlements →
          </Link>
        </div>
      </div>

      {/* Available Features */}
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <h3 className="font-semibold mb-4">Available Paystack Features</h3>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-md text-gray-600">
          <li>• Payment links & checkout</li>
          <li>• Transaction analytics & reports</li>
          <li>• Refunds and disputes</li>
          <li>• Settlements & payouts</li>
          <li>• Customer management</li>
          <li>• Webhooks & API logs</li>
          <li>• Fraud detection & security</li>
        </ul>
      </div>
    </div>
  );
};

export default PaymentDashboard;
