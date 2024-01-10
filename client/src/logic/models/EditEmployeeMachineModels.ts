interface EditEmployeeMachineContext {
    general_data: GeneralData | null;
    employee_documents: EmployeeDocuments | null;
    medical_file: MedicalFile | null;
    worker_data: WorkerData | null;
    message: string;
    from: string;
    employee_id: number;
    key: string;
}

interface EmployeeDocuments {
    photo: string | ArrayBuffer | null;
    CV: string | ArrayBuffer | null;
    ID: string | ArrayBuffer | null;
    addressProof: string | ArrayBuffer | null;
    bachelorDegreeProof: string | ArrayBuffer | null;
    bachelor_degree: string;
}

interface GeneralData {
    first_name: string;
    last_name: string;
    nationality: string | null;
    province: string;
    phone: string;
    email: string;
    zip: string;
    birthday: Date | null;
    country: string;
    city: string;
    street: string;
    settlement: string;
    ext: number;
    int: number;
    cellphone: number;
}

interface MedicalFile {
    Ailments: string[];
    allergies: string[];
    SSN: string;
    hasExternalMedicalInsurance: boolean;
    externalMedicalInsuranceProof: string | ArrayBuffer | null;
    externalMedicalInsuranceName: string;
}

interface WorkerData {
    salary: string;
    department: string | null;
    role: string | null;
    contractEnd: Date | null;
    contractProof: string | ArrayBuffer | null;
    bank_account: number;
    bank: string;
    clabe: number;
    since: Date | null;
    init_journey: Date | null;
    end_journey: Date | null;
}

interface EmployeeData {
    employee_id: number;
    general_data: GeneralData;
    employee_documents: EmployeeDocuments;
    medical_file: MedicalFile;
    worker_data: WorkerData;
}

interface EditEmployeeMachineTypes {
    context: EditEmployeeMachineContext;
    events:
        | { type: "Go Next"; data: GeneralData | EmployeeDocuments | MedicalFile | WorkerData | undefined }
        | { type: "Go Back"; data: GeneralData | EmployeeDocuments | MedicalFile | WorkerData | undefined }
        | { type: "Cancel" }
        | { type: "Save" }
        | { type: "Go Personal Info"; data: GeneralData | EmployeeDocuments | MedicalFile | WorkerData }
        | { type: "Go Documents"; data: GeneralData | EmployeeDocuments | MedicalFile | WorkerData }
        | { type: "Go Medical File"; data: GeneralData | EmployeeDocuments | MedicalFile | WorkerData }
        | { type: "Go Worker Data"; data: GeneralData | EmployeeDocuments | MedicalFile | WorkerData };
}

export type {
    EditEmployeeMachineContext,
    EmployeeDocuments,
    GeneralData,
    MedicalFile,
    WorkerData,
    EmployeeData,
    EditEmployeeMachineTypes
};