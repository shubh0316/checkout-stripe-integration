export interface FormData {
  // Step 1
  duration: number;
  modules: string[];
  moduleTitles: string[];
  
  // Step 2
  firstName: string;
  lastName: string;
  gender: string;
  birthDate: string;
  nationality: string;
  address: string;
  postalCode: string;
  city: string;
  phone: string;
  email: string;
  
  // Step 3
  // languageSkills: {
  //   english: string;
  //   german: string;
  //   spanish: string;
  //   french: string;
  //   other: string;
  // };

  insurance: string;
  
  // Step 4
  accommodation: string;
  diet: string;
  allergies: string;
  emergencyContact: {
    name: string;
    relation: string;
    phone: string;
    email: string;
  };
  termsAccepted: boolean;
}
