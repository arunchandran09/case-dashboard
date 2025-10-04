"use client";

import React, { useEffect, useState } from "react";
import { Gavel, Search, Clock, Landmark, CalendarDays, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// Ensure the correct path to the Combobox component
// import { Combobox, ComboboxInput, ComboboxContent, ComboboxItem } from "@/components/ui/combobox"; // Adjusted the path to match the convention
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Badge from "@/components/ui/badge";
import Field from "@/components/ui/field";
import { fmt } from "@/lib/utils";


interface CaseHistory {
  hearing_date: string;
  purpose_of_hearing: string;
  brief_description: string;
  judge_id: string; // Added field for judge ID
  document_link: string; // Added field for document link
}

interface CaseDetails {
  court: string;
  judge: string;
  case_type: string;
  stage: string;
  filing: string;
  registration: string;
  next_hearing: string;
  cnr: string;
  filing_number: string; // Added field for filing number
  registration_number: string; // Added field for registration number
}

interface FilteredCase {
  id: string;
  cnr: string;
  caseType: string;
  filingNumber: string;
  court: string;
  judge: string;
  stage: string;
  next: string;
}

// const stageOptions = [
//   { value: "any", label: "Any" },
//   { value: "pending", label: "Pending" },
//   { value: "arguments", label: "Arguments" },
//   { value: "orders", label: "Orders" },
// ];

export default function CaseManagementDashboard() {
  const [caseDetails, setCaseDetails] = useState<CaseDetails | null>(null);
  const [caseHistory, setCaseHistory] = useState<CaseHistory[]>([]);
  const [query, setQuery] = useState("");
  const [stage, setStage] = useState("any");
  const [filtered, setFiltered] = useState<FilteredCase[]>([]);
  const [selected, setSelected] = useState<FilteredCase | null>(null);
  const [isLoading] = useState(false); // Removed unused `setIsLoading` to fix the ESLint error.

  useEffect(() => {
    const fetchCaseDetails = async () => {
      try {
        const response = await fetch("/api/case-details");
        if (response.ok) {
          const data = await response.json();
          setCaseDetails(data[0]); // Assuming the API returns an array
        } else {
          console.error("Failed to fetch case details");
        }
      } catch (error) {
        console.error("Error fetching case details:", error);
      }
    };

    const fetchCaseHistory = async () => {
      try {
        const response = await fetch("/api/case-history");
        if (response.ok) {
          const data = await response.json();
          setCaseHistory(data);
        } else {
          console.error("Failed to fetch case history");
        }
      } catch (error) {
        console.error("Error fetching case history:", error);
      }
    };

    fetchCaseDetails();
    fetchCaseHistory();
  }, []);

  // Added filtering logic for caseHistory based on query and stage.
  useEffect(() => {
    const filteredData = caseHistory
      .filter((item) => {
        const matchesQuery = query
          ? item.brief_description.toLowerCase().includes(query.toLowerCase()) ||
            item.purpose_of_hearing.toLowerCase().includes(query.toLowerCase())
          : true;

        const matchesStage = stage === "any" || item.purpose_of_hearing.toLowerCase() === stage.toLowerCase();

        return matchesQuery && matchesStage;
      })
      .map((item, index) => ({
        id: index.toString(), // Generate an ID based on the index
        cnr: "", // Placeholder, replace with actual data if available
        caseType: item.purpose_of_hearing, // Map purpose_of_hearing to caseType
        filingNumber: "", // Placeholder, replace with actual data if available
        court: "", // Placeholder, replace with actual data if available
        judge: "", // Placeholder, replace with actual data if available
        stage: item.purpose_of_hearing, // Map purpose_of_hearing to stage
        next: item.hearing_date, // Map hearing_date to next
      }));

    setFiltered(filteredData);
  }, [caseHistory, query, stage]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Bar */}
      <div className="sticky top-0 z-30 border-b bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
          <Gavel className="h-6 w-6" />
          <h1 className="text-xl font-semibold tracking-tight">
            Case Management
          </h1>
        </div>
      </div>

      <div className="p-6 space-y-6">


        {/* Search Form */}
        <div className="mx-auto max-w-7xl space-y-6 px-4 py-6">
          {/* Search Bar */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Search className="h-4 w-4" />
                Search Cases
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 md:grid-cols-12">
              <div className="md:col-span-8">
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by CNR, party, advocate, judge, stage…"
                />
              </div>
              {/* <div className="md:col-span-2">
                <Combobox value={stage} onValueChange={setStage}>
                  <ComboboxInput placeholder="Stage" />
                  <ComboboxContent>
                    {stageOptions.map((option) => (
                      <ComboboxItem key={option.value} value={option.value}>
                        {option.label}
                      </ComboboxItem>
                    ))}
                  </ComboboxContent>
                </Combobox>
              </div>  */}
              <div className="md:col-span-2 flex gap-2">
                <Button>
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setQuery("");
                    setStage("any");
                  }}
                >
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Full-width Search Results */}
          <Card>
            <CardHeader className="sticky top-0 bg-white z-10">
              <CardTitle className="text-base">
                Search Results ({filtered.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-y-auto max-h-96 rounded-lg border relative">
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
                    <span className="text-gray-500">Please wait...</span>
                  </div>
                )}
                <table className="w-full text-sm">
                  <thead className="bg-slate-100 text-slate-700">
                    <tr>
                      <th className="px-3 py-2 text-left">CNR</th>
                      <th className="px-3 py-2 text-left">Case</th>
                      <th className="px-3 py-2 text-left">Court / Judge</th>
                      <th className="px-3 py-2 text-left">Stage</th>
                      <th className="px-3 py-2 text-left">Next</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((r) => (
                      <tr
                        key={r.id}
                        onClick={() => setSelected(r)}
                        className={`cursor-pointer border-t hover:bg-slate-50 ${
                          selected?.id === r.id ? "bg-slate-50" : ""
                        }`}
                      >
                        <td className="px-3 py-2 font-medium text-slate-900">
                          {r.cnr}
                        </td>
                        <td className="px-3 py-2 text-slate-800">
                          {r.caseType} • {r.filingNumber}
                        </td>
                        <td className="px-3 py-2 text-slate-700">
                          {r.court}
                          <div className="text-xs text-slate-500">
                            {r.judge}
                          </div>
                        </td>
                        <td className="px-3 py-2">
                          <Badge variant="secondary">
                            {r.stage.split(" ")[0]}
                          </Badge>
                        </td>
                        <td className="px-3 py-2">
                          <span className="inline-flex items-center gap-1">
                            <CalendarDays className="h-4 w-4" />
                            {fmt(r.next)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case Details */}
            <section>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Landmark className="h-4 w-4" />
                    Case Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-3 text-sm">
                  {caseDetails && (
                    <>
                      <Field label="Court" value={caseDetails.court} />
                      <Field label="Judge" value={caseDetails.judge} />
                      <Field label="Case Type" value={caseDetails.case_type} />
                      <Field
                        label="Stage"
                        value={caseDetails.stage}
                        className="col-span-2"
                      />
                      <Field
                        label="Filing"
                        value={`${caseDetails.filing_number} • ${fmt(
                          caseDetails.filing
                        )}`}
                      />
                      <Field
                        label="Registration"
                        value={`${caseDetails.registration_number} • ${fmt(
                          caseDetails.registration
                        )}`}
                      />
                      <Field
                        label="Next Hearing"
                        value={
                          <span className="inline-flex items-center gap-2">
                            <CalendarDays className="h-4 w-4" />
                            {fmt(caseDetails.next_hearing)}
                          </span>
                        }
                      />
                      <Field label="CNR" value={caseDetails.cnr} />
                    </>
                  )}
                </CardContent>
              </Card>
            </section>

            {/* Case History */}
            <section>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Clock className="h-4 w-4" />
                    Case History
                  </CardTitle>
                </CardHeader>
                <CardContent className="max-h-96 overflow-y-auto">
                  <ol className="relative ml-2 space-y-6 border-l pl-6">
                    {caseHistory.map((h, i) => (
                      <li key={i} className="group">
                        <span className="absolute -left-1.5 mt-1.5 inline-block h-3 w-3 rounded-full border bg-white" />
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-sm font-medium">
                            {new Date(h.hearing_date).toLocaleDateString()}
                          </span>
                          <Badge variant="secondary">
                            {h.purpose_of_hearing}
                          </Badge>
                          <span className="text-sm text-gray-500">
                            Judge ID: {h.judge_id}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-slate-600">
                          {h.brief_description}
                        </p>
                        {h.document_link && (
                          <a
                            href={h.document_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-500 underline"
                          >
                            View Document
                          </a>
                        )}
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            </section>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-7 gap-6">
            {/* Parties & Advocates */}
            <section className="md:col-span-4 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Clock className="h-4 w-4" />
                    Parties & Advocates
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    <Badge variant="primary">Petitioner</Badge>
                    <p>Surender Singh</p>
                    <p>Advocate: P.R. Ramesh Babu</p>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm font-medium">Respondents</p>
                    <ul className="list-disc pl-5">
                      <li>A.K. Kandaswamy (Deceased)</li>
                      <li>A.K. Saravanan — Advocate: K. Sakthivel</li>
                      <li>Santhi Kandaswamy — Advocate: R. Balaji</li>
                      <li>Latha Karthikeyan</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Key Documents */}
            <section className="md:col-span-3 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <FileText className="h-4 w-4" />
                    Key Documents
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Button variant="outline">Main Petition</Button>
                  <Button variant="outline">Summons to R3</Button>
                  <Button variant="outline">Counter by R2</Button>
                  <Button variant="outline">EA 04/2025 Order</Button>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
