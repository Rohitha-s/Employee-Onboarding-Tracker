
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface Document {
  id: string;
  name: string;
  type: string;
  status: "pending" | "approved" | "rejected";
  uploadedAt: string;
  fileSize: string;
  icon: string;
}

const pendingDocumentTypes = [
  {
    id: "doc-1",
    name: "ID Card",
    description: "Upload a scanned copy of your government-issued ID card",
    required: true
  },
  {
    id: "doc-2",
    name: "Birth Certificate",
    description: "Upload a copy of your birth certificate",
    required: true
  },
  {
    id: "doc-3",
    name: "Aadhaar Card",
    description: "Upload a copy of your Aadhaar card",
    required: true
  },
  {
    id: "doc-4",
    name: "PAN Card",
    description: "Upload a copy of your PAN card",
    required: true
  },
  {
    id: "doc-5",
    name: "Resume",
    description: "Upload your latest resume",
    required: true
  },
  {
    id: "doc-6",
    name: "Degree Certificates",
    description: "Upload your degree certificates (combined in one PDF if possible)",
    required: true
  }
];

const EmployeeDocuments = () => {
  const { toast } = useToast();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [selectedDocType, setSelectedDocType] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleUploadClick = (docType: any) => {
    setSelectedDocType(docType);
    setUploadDialogOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!selectedFile || !selectedDocType) {
      toast({
        title: "Error",
        description: "Please select a file to upload",
        variant: "destructive"
      });
      return;
    }

    // Create a new document object
    const newDocument: Document = {
      id: `doc-${Math.floor(Math.random() * 10000)}`,
      name: selectedFile.name,
      type: selectedDocType.name,
      status: "pending",
      uploadedAt: new Date().toISOString().split('T')[0],
      fileSize: `${Math.round(selectedFile.size / 1024)} KB`,
      icon: "file-text"
    };

    // Add to documents list
    setDocuments([...documents, newDocument]);
    
    // Close dialog and reset form
    setUploadDialogOpen(false);
    setSelectedFile(null);
    setSelectedDocType(null);

    toast({
      title: "Document Uploaded",
      description: `${selectedFile.name} has been uploaded successfully`
    });
  };

  const handleDownload = (doc: Document) => {
    toast({
      title: "Download Started",
      description: `Downloading ${doc.name}...`
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
    }
  };

  const getDocumentIcon = (iconName: string) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    );
  };

  // Filter out document types that have already been uploaded
  const remainingDocTypes = pendingDocumentTypes.filter(
    docType => !documents.some(doc => doc.type === docType.name)
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar showBackButton={true} />
      <div className="flex-1 flex">
        <Sidebar />
        <main className="flex-1 bg-gray-50 p-6 flex flex-col">
          <div className="max-w-6xl mx-auto flex-grow">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-800">Documents</h1>
              <p className="text-gray-600 mt-2">Upload and manage your onboarding documents.</p>
            </div>

            {/* Required Documents Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Required Documents</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {remainingDocTypes.map((docType) => (
                  <Card key={docType.id} className="border-dashed border-2">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex justify-between">
                        {docType.name}
                        {docType.required && (
                          <Badge variant="outline" className="border-red-300 text-red-600">
                            Required
                          </Badge>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm text-gray-600">{docType.description}</p>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        onClick={() => handleUploadClick(docType)}
                        className="w-full"
                      >
                        Upload Document
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>

            {/* Uploaded Documents Section */}
            {documents.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Uploaded Documents</h2>
                
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Document
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Type
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Uploaded
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {documents.map((doc) => (
                          <tr key={doc.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center">
                                  {getDocumentIcon(doc.icon)}
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                                  <div className="text-xs text-gray-500">{doc.fileSize}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{doc.type}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">{doc.uploadedAt}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {getStatusBadge(doc.status)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-blue-600 hover:text-blue-800"
                                onClick={() => handleDownload(doc)}
                              >
                                Download
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>

          <footer className="mt-auto py-4 text-center text-sm text-gray-500">
            <p>Tech Mahindra Ltd. &copy; {new Date().getFullYear()}</p>
          </footer>

          {/* Upload Dialog */}
          <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload {selectedDocType?.name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="file">Select File</Label>
                  <Input
                    id="file"
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  />
                </div>
                {selectedFile && (
                  <div className="bg-gray-100 p-3 rounded-md">
                    <p className="text-sm font-medium">Selected file:</p>
                    <p className="text-sm">{selectedFile.name} ({Math.round(selectedFile.size / 1024)} KB)</p>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setUploadDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleUpload}>Upload Document</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  );
};

export default EmployeeDocuments;
