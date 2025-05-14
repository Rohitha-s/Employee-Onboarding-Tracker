
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const OfficeMap = () => {
  const [selectedLocation, setSelectedLocation] = useState<string | null>('hq');
  
  const locations = [
    { id: 'hq', name: 'Headquarters - Pune', address: '1 Tech Mahindra Park, Pune 411006, India' },
    { id: 'bangalore', name: 'Bangalore Office', address: 'Tech Mahindra Campus, Electronic City, Bangalore 560100, India' },
    { id: 'hyderabad', name: 'Hyderabad Office', address: 'Tech Mahindra Ltd, Hitech City, Hyderabad 500081, India' },
    { id: 'chennai', name: 'Chennai Office', address: 'Tech Mahindra SEZ, Chennai 600119, India' },
    { id: 'delhi', name: 'Delhi Office', address: 'Tech Mahindra Tower, Noida 201301, India' }
  ];
  
  const selectedLocationData = locations.find(loc => loc.id === selectedLocation);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar showBackButton={true} />
      <div className="flex-1 flex">
        <Sidebar />
        <main className="flex-1 bg-gray-50 p-6 flex flex-col">
          <div className="max-w-6xl mx-auto flex-grow">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-800">Office Map</h1>
              <p className="text-gray-600 mt-2">View office locations and maps</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <Card>
                  <CardContent className="p-4">
                    <h2 className="font-semibold text-lg mb-4">Select Location</h2>
                    <div className="flex flex-col space-y-2">
                      {locations.map(location => (
                        <Button
                          key={location.id}
                          variant={selectedLocation === location.id ? "default" : "outline"}
                          className="justify-start"
                          onClick={() => setSelectedLocation(location.id)}
                        >
                          {location.name}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="md:col-span-2">
                <Card>
                  <CardContent className="p-4">
                    <h2 className="font-semibold text-lg mb-4">{selectedLocationData?.name}</h2>
                    <p className="text-gray-600 mb-4">{selectedLocationData?.address}</p>
                    
                    <div className="aspect-video bg-gray-100 relative rounded overflow-hidden">
                      {selectedLocation === 'hq' && (
                        <iframe 
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.2613173278896!2d73.9092906751917!3d18.566946982537366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c147b8b3a3bf%3A0x6f7fdcc8e4d6c77e!2sTech%20Mahindra%20Limited!5e0!3m2!1sen!2sin!4v1690975521884!5m2!1sen!2sin" 
                          width="100%" 
                          height="100%" 
                          style={{ border: 0 }} 
                          allowFullScreen 
                          loading="lazy" 
                          referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                      )}
                      {selectedLocation === 'bangalore' && (
                        <iframe 
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.7478611696147!2d77.65729727483285!3d12.855639587455944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae6b1a8c1fa915%3A0x3303dec007a4440!2sTech%20Mahindra%20Ltd!5e0!3m2!1sen!2sin!4v1690975597062!5m2!1sen!2sin" 
                          width="100%" 
                          height="100%" 
                          style={{ border: 0 }} 
                          allowFullScreen 
                          loading="lazy" 
                          referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                      )}
                      {selectedLocation === 'hyderabad' && (
                        <iframe 
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.2297082373615!2d78.37661507515597!3d17.44955598365313!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93dc8c5d63bd%3A0x45b5962442687127!2sTech%20Mahindra!5e0!3m2!1sen!2sin!4v1690975622004!5m2!1sen!2sin" 
                          width="100%" 
                          height="100%" 
                          style={{ border: 0 }} 
                          allowFullScreen 
                          loading="lazy" 
                          referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                      )}
                      {selectedLocation === 'chennai' && (
                        <iframe 
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.854935458739!2d80.22679187483705!3d13.047384687276686!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526759b467091f%3A0xb2b45c9e99803344!2sTech%20Mahindra%20Limited!5e0!3m2!1sen!2sin!4v1690975652765!5m2!1sen!2sin" 
                          width="100%" 
                          height="100%" 
                          style={{ border: 0 }} 
                          allowFullScreen 
                          loading="lazy" 
                          referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                      )}
                      {selectedLocation === 'delhi' && (
                        <iframe 
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.0043314048574!2d77.3901036753391!3d28.596705687558802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce567e528c15b%3A0x723eb62e0717b4b0!2sTech%20Mahindra%20Ltd!5e0!3m2!1sen!2sin!4v1690975688036!5m2!1sen!2sin" 
                          width="100%" 
                          height="100%" 
                          style={{ border: 0 }} 
                          allowFullScreen 
                          loading="lazy" 
                          referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                      )}
                    </div>
                    
                    <div className="mt-4">
                      <h3 className="font-medium mb-2">Office Facilities</h3>
                      <ul className="list-disc list-inside text-gray-600">
                        <li>24/7 Access</li>
                        <li>Cafeteria</li>
                        <li>Conference Rooms</li>
                        <li>Recreation Area</li>
                        <li>Parking</li>
                        <li>IT Support</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
          
          <footer className="mt-auto py-4 text-center text-sm text-gray-500">
            <p>Tech Mahindra Ltd. &copy; {new Date().getFullYear()}</p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default OfficeMap;
