namespace core{
    export class Contact {
        private m_fullName: string;
        private m_contactNumber: string;
        private m_emailAddress: string;
    constructor(fullName : string = "", contactNumber : string = "", emailAddress : string = "") {
        this.m_fullName = fullName;
        this.m_contactNumber = contactNumber;
        this.m_emailAddress = emailAddress;
    }

    public set FullName(fullName : string) {
        this.m_fullName = fullName;
    }

    public get FullName(): string  {
        return this.m_fullName;
    }

    public set ContactNumber(contactNumber: string) {
        this.m_contactNumber = contactNumber;
    }

    public get ContactNumber(): string {
        return this.m_contactNumber;
    }

    public set EmailAddress(emailAddress: string) {
        this.m_emailAddress = emailAddress;
    }

    public get EmailAddress(): string {
        return this.m_emailAddress;
    }

    public toString(): string {
        return `full Name:${this.FullName}, Contact Number:${this.ContactNumber}, Email:${this.EmailAddress}`;
    }

     public Serialize(): string | null {
        if (this.FullName !== "" && this.ContactNumber !== "" && this.EmailAddress !== "") {
            return `${this.FullName}, ${this.ContactNumber} , ${this.EmailAddress}`;
        }
        console.error("one or more of the properties are missing or invalid");
        return null;

    }

    public Deserialize(data: string): void {
        let propertyArray = data.split(",");
        this.m_fullName = propertyArray[0];
        this.m_contactNumber = propertyArray[1];
        this.m_emailAddress = propertyArray[2];

    }
}




}
