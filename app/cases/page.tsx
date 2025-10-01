"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// Define a type for case items
interface CaseItem {
  id: string;
  title: string;
  status: string;
  lastUpdated: string;
  caseType: string;
  filingNumber: string;
  registrationNumber: string;
  filingDate: string;
  registrationDate: string;
  actsUnder: string;
  cnrNumber: string;
  currentStatus: string;
  petitionerId: string;
  respondentId: string;
}

const CasesPage = () => {
  const [cases, setCases] = useState<CaseItem[]>([]);
  const [selectedCase, setSelectedCase] = useState<CaseItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch case details from the server
    const fetchCases = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/cases");
        if (response.ok) {
          const data = await response.json();
          setCases(data);
        } else {
          console.error("Failed to fetch cases");
        }
      } catch (error) {
        console.error("Error fetching cases:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCases();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-lg font-medium text-gray-700">Loading, please wait...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Cases</h1>
      <Table className="border-collapse border border-gray-300">
        <TableHeader>
          <TableRow>
            <TableHead>Case ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead>Case Type</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cases.map((caseItem: CaseItem, index: number) => (
            <TableRow key={index}>
              <TableCell>{caseItem.id}</TableCell>
              <TableCell>{caseItem.title}</TableCell>
              <TableCell>{caseItem.status}</TableCell>
              <TableCell>{caseItem.lastUpdated}</TableCell>
              <TableCell>{caseItem.caseType}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <button
                      className="text-blue-500 underline"
                      onClick={() => setSelectedCase(caseItem)}
                    >
                      View
                    </button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Case Details</DialogTitle>
                    </DialogHeader>
                    {selectedCase && (
                      <div className="space-y-2">
                        <p><strong>Case ID:</strong> {selectedCase.id}</p>
                        <p><strong>Title:</strong> {selectedCase.title}</p>
                        <p><strong>Status:</strong> {selectedCase.status}</p>
                        <p><strong>Last Updated:</strong> {selectedCase.lastUpdated}</p>
                        <p><strong>Case Type:</strong> {selectedCase.caseType}</p>
                        <p><strong>Filing Number:</strong> {selectedCase.filingNumber}</p>
                        <p><strong>Registration Number:</strong> {selectedCase.registrationNumber}</p>
                        <p><strong>Filing Date:</strong> {selectedCase.filingDate}</p>
                        <p><strong>Registration Date:</strong> {selectedCase.registrationDate}</p>
                        <p><strong>Acts Under:</strong> {selectedCase.actsUnder}</p>
                        <p><strong>CNR Number:</strong> {selectedCase.cnrNumber}</p>
                        <p><strong>Current Status:</strong> {selectedCase.currentStatus}</p>
                        <p><strong>Petitioner ID:</strong> {selectedCase.petitionerId}</p>
                        <p><strong>Respondent ID:</strong> {selectedCase.respondentId}</p>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CasesPage;