
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";

interface PersonalInfoFormValues {
  fullName: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
}

interface BankDetailsFormValues {
  accountHolder: string;
  accountNumber: string;
  bankName: string;
  branchName: string;
  ifscCode: string;
}

const TaskPage = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    setUploading(true);
    
    // Mock file upload
    setTimeout(() => {
      setUploading(false);
      toast({
        title: "Success",
        description: `File "${files[0].name}" uploaded successfully.`,
      });
    }, 1500);
  };
  
  const personalInfoForm = useForm<PersonalInfoFormValues>({
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      emergencyContactName: "",
      emergencyContactNumber: "",
    }
  });
  
  const bankDetailsForm = useForm<BankDetailsFormValues>({
    defaultValues: {
      accountHolder: "",
      accountNumber: "",
      bankName: "",
      branchName: "",
      ifscCode: "",
    }
  });
  
  const handlePersonalInfoSubmit = (data: PersonalInfoFormValues) => {
    toast({
      title: "Success",
      description: "Personal information submitted successfully.",
    });
    
    navigate("/employee/dashboard");
  };
  
  const handleBankDetailsSubmit = (data: BankDetailsFormValues) => {
    toast({
      title: "Success",
      description: "Bank details submitted successfully.",
    });
    
    navigate("/employee/dashboard");
  };
  
  const renderTaskContent = () => {
    switch (taskId) {
      case "personal-info":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Please fill out your personal information for our records.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={personalInfoForm.handleSubmit(handlePersonalInfoSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input 
                      id="fullName"
                      {...personalInfoForm.register("fullName", { required: true })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input 
                      id="phoneNumber"
                      {...personalInfoForm.register("phoneNumber", { required: true })}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input 
                      id="address"
                      {...personalInfoForm.register("address", { required: true })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input 
                      id="city"
                      {...personalInfoForm.register("city", { required: true })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input 
                      id="state"
                      {...personalInfoForm.register("state", { required: true })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input 
                      id="zipCode"
                      {...personalInfoForm.register("zipCode", { required: true })}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <h3 className="text-lg font-medium mb-2">Emergency Contact</h3>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergencyContactName">Name</Label>
                    <Input 
                      id="emergencyContactName"
                      {...personalInfoForm.register("emergencyContactName", { required: true })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergencyContactNumber">Phone Number</Label>
                    <Input 
                      id="emergencyContactNumber"
                      {...personalInfoForm.register("emergencyContactNumber", { required: true })}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2 pt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => navigate("/employee/dashboard")}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Submit</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        );
        
      case "upload-id":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Upload ID Proof</CardTitle>
              <CardDescription>
                Please upload a scanned copy or clear photo of your government-issued ID.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="idUpload">Upload ID Document</Label>
                  <div className="mt-2 flex items-center justify-center w-full">
                    <label htmlFor="idUpload" className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500">PDF, PNG, JPG (MAX. 10MB)</p>
                      </div>
                      <Input 
                        id="idUpload" 
                        type="file" 
                        className="hidden"
                        onChange={handleFileChange}
                        accept=".pdf,.png,.jpg,.jpeg"
                      />
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 pt-6">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate("/employee/dashboard")}
                >
                  Cancel
                </Button>
                <Button disabled={uploading}>
                  {uploading ? "Uploading..." : "Submit"}
                </Button>
              </div>
            </CardContent>
          </Card>
        );
        
      case "bank-details":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Bank Account Details</CardTitle>
              <CardDescription>
                Please provide your bank account information for payroll setup.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={bankDetailsForm.handleSubmit(handleBankDetailsSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="accountHolder">Account Holder Name</Label>
                    <Input 
                      id="accountHolder"
                      {...bankDetailsForm.register("accountHolder", { required: true })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accountNumber">Account Number</Label>
                    <Input 
                      id="accountNumber"
                      {...bankDetailsForm.register("accountNumber", { required: true })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bankName">Bank Name</Label>
                    <Input 
                      id="bankName"
                      {...bankDetailsForm.register("bankName", { required: true })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="branchName">Branch Name</Label>
                    <Input 
                      id="branchName"
                      {...bankDetailsForm.register("branchName", { required: true })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ifscCode">IFSC Code</Label>
                    <Input 
                      id="ifscCode"
                      {...bankDetailsForm.register("ifscCode", { required: true })}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2 pt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => navigate("/employee/dashboard")}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Submit</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        );
        
      case "profile":
        // Redirect to the profile page instead of showing content here
        navigate("/employee/profile");
        return null;
        
      default:
        return (
          <Card>
            <CardContent className="p-6">
              <p className="text-center">Task not found or not available.</p>
              <div className="flex justify-center mt-4">
                <Button onClick={() => navigate("/employee/dashboard")}>
                  Return to Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-6">
      <Button
        variant="ghost"
        onClick={() => navigate("/employee/tasks")}
        className="mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Tasks
      </Button>
      
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Complete Task</h1>
        <p className="text-gray-600">Follow the instructions to complete this task.</p>
      </div>
      
      {renderTaskContent()}
    </div>
  );
};

export default TaskPage;
