import React from "react";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold">Sales Overview</h2>
          <p className="text-2xl font-bold">$36,358</p>
          <p className="text-sm text-green-500">+9% from last year</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold">Yearly Breakup</h2>
          <p className="text-2xl font-bold">$6,820</p>
          <p className="text-sm text-green-500">+9% from last year</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold">Monthly Earnings</h2>
          <p className="text-2xl font-bold">$2,400</p>
          <p className="text-sm text-green-500">+5% from last month</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold">Product Performance</h2>
          <p className="text-2xl font-bold">$12,800</p>
          <p className="text-sm text-red-500">-3% from last quarter</p>
        </div>
      </section>

      <section className="bg-white shadow rounded-lg p-4">
        <h2 className="text-lg font-semibold">Recent Transactions</h2>
        <ul className="divide-y divide-gray-200">
          <li className="py-2">Payment received from John Doe of $385.90</li>
          <li className="py-2">Payment made to Michael of $64.95</li>
          <li className="py-2">New sale recorded for #ML-3467</li>
        </ul>
      </section>
    </div>
  );
}
