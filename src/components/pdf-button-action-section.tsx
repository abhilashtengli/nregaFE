
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { toast } from "sonner";

// Action buttons data
const actionButtons = [
  "Generate Invoice",
  "Create Purchase Order",
  "Vendor Report",
  "Payment Status",
  "Tax Summary",
  "Compliance Check",
  "Contract Details",
  "Performance Review",
  "Audit Trail",
  "Expense Report",
  "Budget Analysis",
  "Cost Center Report",
  "Approval Workflow",
  "Document Archive",
  "Vendor Onboarding",
  "Risk Assessment",
  "Quality Metrics",
  "Service Level Report",
  "Renewal Tracker",
  "Dispute Management"
];

interface WorkData {
  vendorName: string;
  vendorGstNo: string;
  workDetail: {
    workCode: string;
    district: string;
    block: string;
    panchayat: string;
    workName: string;
    workCategory: string;
    workType: string;
    workStatus: string;
    implementingAgency: string;
    financialYear: string;
    sanctionYear: string;
    workStartDate: string;
    estimatedCost: number;
    actualExpenditure: number;
    estimatedPersonDays: number;
    actualPersonDays: number;
  };
}

interface ActionsSectionProps {
  workData: WorkData | null;
}

export default function ActionsSection({ workData }: ActionsSectionProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [loadingButtons, setLoadingButtons] = useState<Set<number>>(new Set());

  const handleActionButton = async (buttonIndex: number, action: string) => {
    setLoadingButtons((prev) => new Set(prev).add(buttonIndex));
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoadingButtons((prev) => {
      const newSet = new Set(prev);
      newSet.delete(buttonIndex);
      return newSet;
    });

    toast.success("Action Completed", {
      description: `${action} has been processed successfully.`
    });
  };

  const handleDownloadAll = async () => {
    if (!workData) {
      toast.error("Missing Information", {
        description: "Please submit work code data first."
      });
      return;
    }

    setIsDownloading(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setIsDownloading(false);

    toast.success("Download Complete", {
      description: "All PDFs have been generated and downloaded successfully."
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Actions</CardTitle>
        <p className="text-sm text-gray-600">
          Generate reports and manage vendor operations
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {actionButtons.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleActionButton(index, action)}
                disabled={!workData || loadingButtons.has(index)}
                className="h-auto py-3 px-2 text-xs font-medium text-center whitespace-normal"
              >
                {loadingButtons.has(index) ? (
                  <Loader2 className="w-3 h-3 animate-spin" />
                ) : (
                  action
                )}
              </Button>
            ))}
          </div>

          <div className="flex justify-center pt-4 border-t">
            <Button
              size="lg"
              onClick={handleDownloadAll}
              disabled={!workData || isDownloading}
              className="px-8 py-4 text-lg font-semibold bg-blue-600 hover:bg-blue-700"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Generating PDFs...
                </>
              ) : (
                <>
                  <Download className="w-5 h-5 mr-2" />
                  Download All PDFs
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
