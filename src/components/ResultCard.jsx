import React from 'react';
import { Card, Button } from 'react-bootstrap';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import "../App";

const ResultCard = ({
  withdrawalAmount,
  deductionPercentage,
  deductionDecimal,
  deductionValue,
  finalAmount,
}) => {
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text('Withdrawal Calculation Summary', 14, 20);
    autoTable(doc, {
      startY: 30,
      head: [['Field', 'Value']],
      body: [
        ['Withdrawal Amount', `₹${withdrawalAmount}`],
        ['Deduction Percentage', `${deductionPercentage}%`],
        ['Converted to Decimal', deductionDecimal],
        ['Deduction Amount', `₹${deductionValue}`],
        ['Final Amount', `₹${finalAmount}`],
      ],
    });
    doc.save('withdrawal-summary.pdf');
  };

  const exportToExcel = () => {
    const wsData = [
      ['Field', 'Value'],
      ['Withdrawal Amount', `₹${withdrawalAmount}`],
      ['Deduction Percentage', `${deductionPercentage}%`],
      ['Converted to Decimal', deductionDecimal],
      ['Deduction Amount', `₹${deductionValue}`],
      ['Final Amount', `₹${finalAmount}`],
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(wsData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Summary');

    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    const data = new Blob([excelBuffer], {
      type: 'application/octet-stream',
    });

    saveAs(data, 'withdrawal-summary.xlsx');
  };

  return (
    <Card className={`mt-4 resultBox`}>
      <h5 className="mb-3">Calculation Summary</h5>
      <p className="resultText">
        Withdrawal Amount: <span className="highlight">₹{withdrawalAmount}</span>
      </p>
      <p className="resultText">
        Deduction Percentage: <span className="highlight">{deductionPercentage}%</span>
      </p>
      <p className="resultText">
        Converted to Decimal: <span className="highlight">{deductionDecimal}</span>
      </p>
      <p className="resultText">
        Deduction Amount: <span className="highlight">₹{deductionValue}</span>
      </p>
      <hr />
      <p className="resultText mt-3">
        Final Amount After Deduction:{' '}
        <span className="highlight">₹{finalAmount}</span>
      </p>

      <div className="mt-3">
        <Button variant="success" onClick={exportToPDF} className="me-2">
          Export to PDF
        </Button>
        <Button variant="info" onClick={exportToExcel}>
          Export to Excel
        </Button>
      </div>
    </Card>
  );
};

export default ResultCard;
