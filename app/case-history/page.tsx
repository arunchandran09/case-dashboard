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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

interface CaseHistory {
  case_id: string;
  hearing_date: string;
  purpose_of_hearing: string;
  brief_description: string;
  judge_id: string;
  document_link: string;
}

const CaseHistoryPage = () => {
  const [caseHistory, setCaseHistory] = useState<CaseHistory[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogData, setDialogData] = useState<CaseHistory | null>(null);

  const openDialog = (data: CaseHistory) => {
    setDialogData(data);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setDialogData(null);
  };

  useEffect(() => {
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

    fetchCaseHistory();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6">Case History</h1>
      <div className="overflow-x-auto">
        <Table className="w-full border border-gray-300 shadow-md rounded-lg">
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead>Case ID</TableHead>
              <TableHead>Hearing Date</TableHead>
              <TableHead>Purpose of Hearing</TableHead>
              <TableHead>Judge ID</TableHead>
              <TableHead>Document Link</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {caseHistory.map((history, index) => (
              <TableRow key={index}>
                <TableCell>{history.case_id}</TableCell>
                <TableCell>{history.hearing_date}</TableCell>
                <TableCell>{history.purpose_of_hearing}</TableCell>
                <TableCell>{history.judge_id}</TableCell>
                <TableCell>
                  {history.document_link ? (
                    <a
                      href={history.document_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View Document
                    </a>
                  ) : (
                    <span className="text-gray-500">N/A</span>
                  )}
                </TableCell>
                <TableCell>
                  <button
                    onClick={() => openDialog(history)}
                    className="text-blue-600 hover:underline"
                  >
                    Full Case Details
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Full Case Details</DialogTitle>
          </DialogHeader>
          {dialogData && (
            <div className="space-y-4">
              <p><strong>Case ID:</strong> {dialogData.case_id}</p>
              <p><strong>Hearing Date:</strong> {dialogData.hearing_date}</p>
              <p><strong>Purpose of Hearing:</strong> {dialogData.purpose_of_hearing}</p>
              <p><strong>Judge ID:</strong> {dialogData.judge_id}</p>
              <p>
                <strong>Document Link:</strong> {dialogData.document_link ? (
                  <a
                    href={dialogData.document_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View Document
                  </a>
                ) : (
                  <span className="text-gray-500">N/A</span>
                )}
              </p>
              <p><strong>Brief Description:</strong> {dialogData.brief_description}</p>
            </div>
          )}
          <DialogFooter>
            <button
              onClick={closeDialog}
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Close
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CaseHistoryPage;