
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { FileText, ChevronDown, ChevronUp } from "lucide-react";

interface Policy {
  id: string;
  title: string;
  category: string;
  content: string;
  lastUpdated: string;
}

const policies: Policy[] = [
  {
    id: "pol1",
    title: "Code of Conduct",
    category: "general",
    lastUpdated: "2025-01-15",
    content: `
      <h2>Tech Mahindra Code of Conduct</h2>
      
      <p>This Code of Conduct outlines the expectations and guidelines for all Tech Mahindra employees. It is designed to ensure that we maintain our standards of ethics, integrity, and professionalism.</p>
      
      <h3>Ethical Standards</h3>
      <ul>
        <li>Act with honesty and integrity in all business dealings</li>
        <li>Avoid conflicts of interest between work and personal affairs</li>
        <li>Respect the confidentiality of information acquired in the course of work</li>
        <li>Refuse to engage in or tolerate any form of corruption or bribery</li>
      </ul>
      
      <h3>Workplace Behavior</h3>
      <ul>
        <li>Treat all colleagues, clients, and business partners with respect and dignity</li>
        <li>Maintain a safe and healthy work environment</li>
        <li>Do not discriminate or harass any individual on the basis of race, religion, gender, age, disability, or any other protected characteristic</li>
        <li>Foster a culture of inclusion and diversity</li>
      </ul>
      
      <h3>Company Assets and Information</h3>
      <ul>
        <li>Protect company assets and ensure their efficient use</li>
        <li>Safeguard confidential information and intellectual property</li>
        <li>Maintain accurate and complete business records</li>
        <li>Use company-provided tools and systems responsibly and primarily for business purposes</li>
      </ul>
    `
  },
  {
    id: "pol2",
    title: "IT Security Policy",
    category: "it",
    lastUpdated: "2025-02-20",
    content: `
      <h2>Tech Mahindra IT Security Policy</h2>
      
      <p>This policy outlines the security measures and practices that all employees must follow to ensure the protection of our IT infrastructure and data.</p>
      
      <h3>Access Control</h3>
      <ul>
        <li>All users must authenticate using their unique credentials when accessing company systems</li>
        <li>Access rights are based on the principle of least privilege</li>
        <li>Regular access review processes must be conducted</li>
        <li>Remote access to company systems requires additional security measures</li>
      </ul>
      
      <h3>Data Protection</h3>
      <ul>
        <li>Sensitive data must be encrypted at rest and in transit</li>
        <li>Data must be classified according to its sensitivity</li>
        <li>Data retention policies must be followed</li>
        <li>Data breaches must be reported immediately</li>
      </ul>
      
      <h3>Device Security</h3>
      <ul>
        <li>All company-owned devices must have approved security software installed</li>
        <li>All devices must be kept updated with the latest security patches</li>
        <li>Personal devices used for work must comply with BYOD policies</li>
        <li>Lost or stolen devices must be reported immediately to IT security</li>
      </ul>
    `
  },
  {
    id: "pol3",
    title: "Leave Policy",
    category: "hr",
    lastUpdated: "2025-03-05",
    content: `
      <h2>Tech Mahindra Leave Policy</h2>
      
      <p>This policy outlines the leave entitlements and procedures for all employees of Tech Mahindra.</p>
      
      <h3>Leave Entitlement</h3>
      <ul>
        <li>Annual Leave: 20 days per calendar year</li>
        <li>Sick Leave: 12 days per calendar year</li>
        <li>Casual Leave: 6 days per calendar year</li>
        <li>Public Holidays: As per the official holiday calendar</li>
      </ul>
      
      <h3>Leave Application Procedure</h3>
      <ul>
        <li>All leave requests must be submitted through the company's leave management system</li>
        <li>Leave requests should be submitted at least 7 days in advance for planned leaves</li>
        <li>Emergency leaves must be notified to the manager as soon as possible</li>
        <li>All leaves are subject to manager approval based on business requirements</li>
      </ul>
      
      <h3>Leave Encashment</h3>
      <ul>
        <li>Unused annual leave may be carried forward to the next year, up to a maximum of 10 days</li>
        <li>Encashment of leave is allowed as per company policy</li>
        <li>Encashment calculations will be based on the basic salary of the employee</li>
      </ul>
    `
  },
  {
    id: "pol4",
    title: "Work From Home Policy",
    category: "hr",
    lastUpdated: "2025-01-10",
    content: `
      <h2>Tech Mahindra Work From Home Policy</h2>
      
      <p>This policy outlines the guidelines and expectations for employees working remotely.</p>
      
      <h3>Eligibility</h3>
      <ul>
        <li>Work from home arrangements are based on job role suitability</li>
        <li>The employee must have adequate internet connectivity and a suitable workspace</li>
        <li>Remote work arrangements require manager approval</li>
      </ul>
      
      <h3>Work Hours and Availability</h3>
      <ul>
        <li>Regular working hours apply unless otherwise agreed</li>
        <li>Employees must be available for calls and meetings during core business hours</li>
        <li>Time tracking may be required for certain roles</li>
        <li>Regular check-ins with managers and team members are expected</li>
      </ul>
      
      <h3>Equipment and Security</h3>
      <ul>
        <li>Company-provided equipment must be used in accordance with IT policies</li>
        <li>Data security measures must be strictly followed</li>
        <li>VPN connections must be used when accessing company systems</li>
        <li>Any security incidents must be reported immediately</li>
      </ul>
    `
  },
  {
    id: "pol5",
    title: "Travel Policy",
    category: "general",
    lastUpdated: "2025-04-12",
    content: `
      <h2>Tech Mahindra Travel Policy</h2>
      
      <p>This policy outlines the guidelines for business travel and related expenses.</p>
      
      <h3>Travel Approval</h3>
      <ul>
        <li>All business travel requires prior approval through the travel management system</li>
        <li>The purpose of travel must be clearly stated and justified</li>
        <li>Travel requests should be submitted at least 14 days in advance for international travel</li>
        <li>Emergency travel may be approved on shorter notice with senior management approval</li>
      </ul>
      
      <h3>Travel Arrangements</h3>
      <ul>
        <li>All travel bookings must be made through the company's approved travel agency</li>
        <li>Economy class is the standard for air travel unless specifically approved otherwise</li>
        <li>Hotel accommodations must be within the approved budget for the destination</li>
        <li>Ground transportation should prioritize cost-effectiveness and safety</li>
      </ul>
      
      <h3>Expense Reporting</h3>
      <ul>
        <li>All expenses must be submitted with appropriate documentation within 7 days of return</li>
        <li>Per diem allowances apply as per the company's expense policy</li>
        <li>Personal expenses will not be reimbursed</li>
        <li>Any exceptions to the policy require senior management approval</li>
      </ul>
    `
  }
];

const CompanyPolicies = () => {
  const { toast } = useToast();
  const [expandedPolicy, setExpandedPolicy] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("all");
  
  const filteredPolicies = activeTab === "all" 
    ? policies 
    : policies.filter(policy => policy.category === activeTab);
  
  const togglePolicy = (policyId: string) => {
    setExpandedPolicy(expandedPolicy === policyId ? null : policyId);
  };
  
  const handleDownload = (policy: Policy) => {
    toast({
      title: "Download Started",
      description: `Downloading ${policy.title}.pdf`
    });
  };
  
  const handleAcknowledge = (policy: Policy) => {
    toast({
      title: "Policy Acknowledged",
      description: `You have acknowledged the ${policy.title} policy`
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar showBackButton={true} />
      <div className="flex-1 flex">
        <Sidebar />
        <main className="flex-1 bg-gray-50 p-6 flex flex-col">
          <div className="max-w-6xl mx-auto flex-grow">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-800">Company Policies</h1>
              <p className="text-gray-600 mt-2">Review and acknowledge company policies and guidelines</p>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="all">All Policies</TabsTrigger>
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="hr">HR</TabsTrigger>
                <TabsTrigger value="it">IT</TabsTrigger>
              </TabsList>
              
              <TabsContent value={activeTab}>
                <div className="space-y-4">
                  {filteredPolicies.map(policy => (
                    <Card key={policy.id}>
                      <CardContent className="p-0">
                        <div 
                          className="p-4 flex items-center justify-between cursor-pointer"
                          onClick={() => togglePolicy(policy.id)}
                        >
                          <div>
                            <h2 className="text-lg font-medium">{policy.title}</h2>
                            <p className="text-sm text-gray-500">Last updated: {policy.lastUpdated}</p>
                          </div>
                          <div>
                            {expandedPolicy === policy.id ? (
                              <ChevronUp className="h-5 w-5 text-gray-500" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-gray-500" />
                            )}
                          </div>
                        </div>
                        
                        {expandedPolicy === policy.id && (
                          <div className="border-t px-4 py-6">
                            <div 
                              className="prose prose-slate max-w-none mb-6"
                              dangerouslySetInnerHTML={{ __html: policy.content }}
                            />
                            
                            <div className="flex justify-end space-x-4">
                              <Button
                                variant="outline"
                                onClick={() => handleDownload(policy)}
                                className="flex items-center"
                              >
                                <FileText className="h-4 w-4 mr-2" />
                                Download PDF
                              </Button>
                              <Button 
                                onClick={() => handleAcknowledge(policy)}
                              >
                                I Acknowledge
                              </Button>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
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

export default CompanyPolicies;
