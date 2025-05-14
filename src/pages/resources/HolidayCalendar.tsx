
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Holiday {
  id: string;
  name: string;
  date: string;
  description: string;
  type: "national" | "regional" | "company";
}

const holidays: Holiday[] = [
  {
    id: "h1",
    name: "New Year's Day",
    date: "2025-01-01",
    description: "New Year's Day is the first day of the year in the Gregorian calendar.",
    type: "national"
  },
  {
    id: "h2",
    name: "Republic Day",
    date: "2025-01-26",
    description: "Republic Day honors the date on which the Constitution of India came into effect.",
    type: "national"
  },
  {
    id: "h3",
    name: "Holi",
    date: "2025-03-14",
    description: "Holi is a popular ancient Indian festival, also known as the 'Festival of Colors'.",
    type: "national"
  },
  {
    id: "h4",
    name: "Good Friday",
    date: "2025-04-18",
    description: "Good Friday is a Christian holiday commemorating the crucifixion of Jesus and his death at Calvary.",
    type: "national"
  },
  {
    id: "h5",
    name: "Labor Day",
    date: "2025-05-01",
    description: "Labor Day celebrates the achievements of workers.",
    type: "national"
  },
  {
    id: "h6",
    name: "Independence Day",
    date: "2025-08-15",
    description: "Independence Day marks the end of British rule in 1947 and the establishment of a free and independent Indian nation.",
    type: "national"
  },
  {
    id: "h7",
    name: "Gandhi Jayanti",
    date: "2025-10-02",
    description: "Gandhi Jayanti celebrates the birth anniversary of Mahatma Gandhi.",
    type: "national"
  },
  {
    id: "h8",
    name: "Diwali",
    date: "2025-11-12",
    description: "Diwali, the festival of lights, is one of the major festivals celebrated by Hindus, Jains, and Sikhs.",
    type: "national"
  },
  {
    id: "h9",
    name: "Christmas",
    date: "2025-12-25",
    description: "Christmas is an annual festival commemorating the birth of Jesus Christ.",
    type: "national"
  },
  {
    id: "h10",
    name: "Company Foundation Day",
    date: "2025-06-15",
    description: "Celebration of Tech Mahindra's foundation day.",
    type: "company"
  }
];

const HolidayCalendar = () => {
  const [year, setYear] = useState(2025);
  const [selectedHoliday, setSelectedHoliday] = useState<Holiday | null>(null);
  
  const filteredHolidays = holidays.filter(holiday => {
    const holidayYear = new Date(holiday.date).getFullYear();
    return holidayYear === year;
  });
  
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const holidaysByMonth: Record<string, Holiday[]> = {};
  
  filteredHolidays.forEach(holiday => {
    const month = new Date(holiday.date).getMonth();
    if (!holidaysByMonth[month]) {
      holidaysByMonth[month] = [];
    }
    holidaysByMonth[month].push(holiday);
  });
  
  const getHolidayType = (type: string) => {
    switch (type) {
      case "national":
        return <Badge className="bg-red-100 text-red-800">National</Badge>;
      case "regional":
        return <Badge className="bg-blue-100 text-blue-800">Regional</Badge>;
      case "company":
        return <Badge className="bg-purple-100 text-purple-800">Company</Badge>;
      default:
        return null;
    }
  };
  
  const handlePreviousYear = () => {
    setYear(year - 1);
  };
  
  const handleNextYear = () => {
    setYear(year + 1);
  };
  
  const handleHolidayClick = (holiday: Holiday) => {
    setSelectedHoliday(holiday);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar showBackButton={true} />
      <div className="flex-1 flex">
        <Sidebar />
        <main className="flex-1 bg-gray-50 p-6 flex flex-col">
          <div className="max-w-6xl mx-auto flex-grow">
            <div className="mb-6 flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Holiday Calendar</h1>
                <p className="text-gray-600 mt-2">View company holidays for the year</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="icon" onClick={handlePreviousYear}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-lg font-medium">{year}</span>
                <Button variant="outline" size="icon" onClick={handleNextYear}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card>
                  <CardContent className="p-4">
                    <h2 className="font-semibold text-lg mb-4">Holiday List - {year}</h2>
                    
                    {months.map((month, index) => (
                      holidaysByMonth[index] && (
                        <div key={month} className="mb-6">
                          <h3 className="font-medium text-gray-700 mb-2">{month}</h3>
                          <div className="space-y-2">
                            {holidaysByMonth[index].map(holiday => (
                              <div 
                                key={holiday.id} 
                                className={`p-3 border rounded-md cursor-pointer transition-colors ${
                                  selectedHoliday?.id === holiday.id ? 
                                  'bg-blue-50 border-blue-200' : 
                                  'hover:bg-gray-50'
                                }`}
                                onClick={() => handleHolidayClick(holiday)}
                              >
                                <div className="flex justify-between">
                                  <div className="font-medium">{holiday.name}</div>
                                  <div className="text-gray-500">
                                    {new Date(holiday.date).toLocaleDateString('en-US', { 
                                      day: 'numeric',
                                      month: 'short'
                                    })}
                                  </div>
                                </div>
                                <div className="mt-1">
                                  {getHolidayType(holiday.type)}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    ))}
                    
                    {Object.keys(holidaysByMonth).length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <CalendarIcon className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                        <p>No holidays found for {year}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
              
              <div className="md:col-span-1">
                <Card className="h-full">
                  <CardContent className="p-4">
                    {selectedHoliday ? (
                      <>
                        <h2 className="font-semibold text-lg mb-2">{selectedHoliday.name}</h2>
                        <div className="mb-4 flex items-center">
                          <CalendarIcon className="h-4 w-4 mr-2 text-gray-500" />
                          <span className="text-gray-600">
                            {new Date(selectedHoliday.date).toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                        {getHolidayType(selectedHoliday.type)}
                        <p className="mt-4 text-gray-700">{selectedHoliday.description}</p>
                      </>
                    ) : (
                      <div className="text-center py-12 text-gray-500">
                        <CalendarIcon className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                        <p>Select a holiday to view details</p>
                      </div>
                    )}
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

export default HolidayCalendar;
