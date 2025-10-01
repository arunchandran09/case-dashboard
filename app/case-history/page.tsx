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

interface CaseHistory {
  case_id: string;
  hearing_date: string;
  purpose_of_hearing: string;
  brief_description: string;
  judge_id: string;
  document_link: string;
}

const BriefDescriptionModal = ({ content, isOpen, onClose }: { content: string; isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white bg-opacity-90 p-4 rounded-lg shadow-lg max-w-xs w-full">
        <h2 className="text-lg font-bold mb-2">Brief Description</h2>
        <p className="text-sm text-gray-700">{content}</p>
        <button
          onClick={onClose}
          className="mt-4 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const CaseHistoryPage = () => {
  const [caseHistory, setCaseHistory] = useState<CaseHistory[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const openModal = (content: string) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent("");
  };

  useEffect(() => {
    const fetchCaseHistory = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/case-history");
        if (response.ok) {
          const data = await response.json();
          setCaseHistory(data);
        } else {
          console.error("Failed to fetch case history");
        }
      } catch (error) {
        console.error("Error fetching case history:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCaseHistory();
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
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6">Case History</h1>
      <div className="overflow-x-auto">
        <Table className="w-full border border-gray-300 shadow-md rounded-lg">
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="px-4 py-2 text-left text-gray-600">Case ID</TableHead>
              <TableHead className="px-4 py-2 text-left text-gray-600">Hearing Date</TableHead>
              <TableHead className="px-4 py-2 text-left text-gray-600">Purpose of Hearing</TableHead>
              <TableHead className="px-4 py-2 text-left text-gray-600">Judge ID</TableHead>
              <TableHead className="px-4 py-2 text-left text-gray-600">Document Link</TableHead>
              <TableHead className="px-4 py-2 text-left text-gray-600">Brief Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {caseHistory.map((history, index) => (
              <TableRow key={index} className="hover:bg-gray-50">
                <TableCell className="px-4 py-2 border-t border-gray-200">{history.case_id}</TableCell>
                <TableCell className="px-4 py-2 border-t border-gray-200">{history.hearing_date}</TableCell>
                <TableCell className="px-4 py-2 border-t border-gray-200">{history.purpose_of_hearing}</TableCell>
                <TableCell className="px-4 py-2 border-t border-gray-200">{history.judge_id}</TableCell>
                <TableCell className="px-4 py-2 border-t border-gray-200">
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
                <TableCell className="px-4 py-2 border-t border-gray-200">
                  <button
                    onClick={() => openModal(history.brief_description)}
                    className="text-blue-600 hover:underline flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 mr-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 9V5.25m0 0L12 9m3.75-3.75L19.5 9M9 15.75H5.25m0 0L9 12m-3.75 3.75L3 12"
                      />
                    </svg>
                    View
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <BriefDescriptionModal
        content={modalContent}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default CaseHistoryPage;