
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const EmployeeProfile = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [formCompleted, setFormCompleted] = useState(false);
  const [comingFromTask, setComingFromTask] = useState(false);

  useEffect(() => {
    // Check if user came from a task
    const path = window.location.pathname;
    if (path === "/employee/profile") {
      setComingFromTask(true);
    }
  }, []);

  const handleSave = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setFormCompleted(true);
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully."
      });

      // If this was coming from a task, show special completion toast
      if (comingFromTask) {
        toast({
          title: "Task Completed",
          description: "Profile completion task has been marked as done.",
          variant: "default"
        });
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar showBackButton={true} />
      <div className="flex-1 flex">
        <Sidebar />
        <main className="flex-1 bg-gray-50 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
              <p className="text-gray-600 mt-2">View and manage your personal information.</p>
            </div>

            <Card className="mb-8">
              <CardHeader className="pb-2 flex flex-row items-center">
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 rounded-full bg-blue-700 flex items-center justify-center text-white text-2xl font-bold">
                    JD
                  </div>
                  <div>
                    <CardTitle className="text-2xl">John Doe</CardTitle>
                    <p className="text-gray-500">Software Engineer</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <p className="text-sm text-gray-500">Employee ID</p>
                    <p className="font-medium">EMP-123456</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Department</p>
                    <p className="font-medium">Engineering</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Joining Date</p>
                    <p className="font-medium">May 1, 2025</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">Bangalore, India</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="personal">Personal Information</TabsTrigger>
                <TabsTrigger value="contact">Contact Details</TabsTrigger>
                <TabsTrigger value="emergency">Emergency Contacts</TabsTrigger>
              </TabsList>

              <TabsContent value="personal">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" defaultValue="John" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" defaultValue="Doe" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="dob">Date of Birth</Label>
                          <Input id="dob" type="date" defaultValue="1990-01-15" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="gender">Gender</Label>
                          <select 
                            id="gender" 
                            className="w-full px-3 py-2 border rounded-md border-input bg-background text-sm"
                            defaultValue="male"
                          >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="maritalStatus">Marital Status</Label>
                          <select 
                            id="maritalStatus" 
                            className="w-full px-3 py-2 border rounded-md border-input bg-background text-sm"
                            defaultValue="single"
                          >
                            <option value="single">Single</option>
                            <option value="married">Married</option>
                            <option value="divorced">Divorced</option>
                            <option value="widowed">Widowed</option>
                          </select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="bloodGroup">Blood Group</Label>
                          <select 
                            id="bloodGroup" 
                            className="w-full px-3 py-2 border rounded-md border-input bg-background text-sm"
                            defaultValue="o_positive"
                          >
                            <option value="a_positive">A+</option>
                            <option value="a_negative">A-</option>
                            <option value="b_positive">B+</option>
                            <option value="b_negative">B-</option>
                            <option value="ab_positive">AB+</option>
                            <option value="ab_negative">AB-</option>
                            <option value="o_positive">O+</option>
                            <option value="o_negative">O-</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <Button type="button" onClick={handleSave} disabled={isSaving}>
                          {isSaving ? "Saving..." : "Save Changes"}
                        </Button>
                        
                        {comingFromTask && formCompleted && (
                          <Button 
                            type="button" 
                            onClick={() => navigate("/employee/dashboard")} 
                            className="ml-2" 
                            variant="outline"
                          >
                            Return to Dashboard
                          </Button>
                        )}
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="contact">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input id="email" type="email" defaultValue="john.doe@example.com" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input id="phone" defaultValue="+91 9876543210" />
                        </div>
                        
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="address">Address</Label>
                          <Textarea id="address" rows={3} defaultValue="123 Main Street, Apartment 4B" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input id="city" defaultValue="Bangalore" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="postalCode">Postal Code</Label>
                          <Input id="postalCode" defaultValue="560001" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="state">State</Label>
                          <Input id="state" defaultValue="Karnataka" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="country">Country</Label>
                          <Input id="country" defaultValue="India" />
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <Button type="button" onClick={handleSave} disabled={isSaving}>
                          {isSaving ? "Saving..." : "Save Changes"}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="emergency">
                <Card>
                  <CardHeader>
                    <CardTitle>Emergency Contacts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <h3 className="font-medium mb-4">Primary Contact</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="emergencyName1">Name</Label>
                          <Input id="emergencyName1" defaultValue="Jane Doe" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="emergencyRelation1">Relationship</Label>
                          <Input id="emergencyRelation1" defaultValue="Spouse" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="emergencyPhone1">Phone Number</Label>
                          <Input id="emergencyPhone1" defaultValue="+91 9876543211" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="emergencyEmail1">Email Address</Label>
                          <Input id="emergencyEmail1" type="email" defaultValue="jane.doe@example.com" />
                        </div>
                      </div>
                    </div>

                    <Separator className="my-6" />

                    <div>
                      <h3 className="font-medium mb-4">Secondary Contact</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="emergencyName2">Name</Label>
                          <Input id="emergencyName2" defaultValue="Robert Doe" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="emergencyRelation2">Relationship</Label>
                          <Input id="emergencyRelation2" defaultValue="Parent" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="emergencyPhone2">Phone Number</Label>
                          <Input id="emergencyPhone2" defaultValue="+91 9876543212" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="emergencyEmail2">Email Address</Label>
                          <Input id="emergencyEmail2" type="email" defaultValue="robert.doe@example.com" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Button type="button" onClick={handleSave} disabled={isSaving}>
                        {isSaving ? "Saving..." : "Save Changes"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          <footer className="mt-auto py-4 text-center text-sm text-gray-500">
            <p>Tech Mahindra Ltd. &copy; {new Date().getFullYear()}</p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default EmployeeProfile;
