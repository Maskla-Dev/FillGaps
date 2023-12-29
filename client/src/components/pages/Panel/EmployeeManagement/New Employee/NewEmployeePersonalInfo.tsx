import React, { useState } from "react";
import BoldText from "../../../../atoms/BoldText.tsx";
import DatePick from "../../../../organisms/DatePick.tsx";
import SelectInput from "../../../../molecules/SelectInput.tsx";
import InputText from "../../../../atoms/InputText.tsx";
import FormButton from "../../../../atoms/FormButton.tsx";
import { AppContext } from "../../../../../logic/ActorContexts.ts";
import { NewEmployeeChildProps } from "./NewEmployeeDocuments.tsx";

const NATIONALITIES: string[] = [
    "Afghan", "Albanian", "Algerian", "American",
    "Andorran", "Angolan", "Anguillan", "Citizen of Antigua and Barbuda",
    "Argentine", "Armenian", "Australian", "Austrian",
    "Azerbaijani", "Bahamian", "Bahraini", "Bangladeshi", "Barbadian",
    "Belarusian", "Belgian", "Belizean", "Beninese",
    "Bermudian", "Bhutanese", "Bolivian", "Citizen of Bosnia and Herzegovina",
    "Botswanan", "Brazilian", "British", "British Virgin Islander",
    "Bruneian", "Bulgarian", "Burkinan", "Burmese",
    "Burundian", "Cambodian", "Cameroonian", "Canadian", "Cape Verdean",
    "Cayman Islander", "Central African", "Chadian", "Chilean",
    "Chinese", "Colombian", "Comoran", "Congolese (Congo)",
    "Congolese (DRC)", "Cook Islander", "Costa Rican", "Croatian",
    "Cuban", "Cymraes", "Cymro", "Cypriot",
    "Czech", "Danish", "Djiboutian", "Dominican", "Citizen of the Dominican Republic",
    "Dutch", "East Timorese", "Ecuadorean", "Egyptian", "Emirati",
    "English", "Equatorial Guinean", "Eritrean", "Estonian",
    "Ethiopian", "Faroese", "Fijian", "Filipino", "Finnish",
    "French", "Gabonese", "Gambian", "Georgian", "German",
    "Ghanaian", "Gibraltarian", "Greek", "Greenlandic",
    "Grenadian", "Guamanian", "Guatemalan", "Citizen of Guinea-Bissau",
    "Guinean", "Guyanese", "Haitian", "Honduran", "Hong Konger", "Hungarian", "Icelandic", "Indian", "Indonesian", "Iranian",
    "Iraqi", "Irish", "Israeli", "Italian",
    "Ivorian", "Jamaican", "Japanese", "Jordanian", "Kazakh", "Kenyan", "Kittitian", "Citizen of Kiribati",
    "Kosovan", "Kuwaiti", "Kyrgyz", "Lao", "Latvian", "Lebanese", "Liberian",
    "Libyan", "Liechtenstein citizen", "Lithuanian", "Luxembourger", "Macanese", "Macedonian", "Malagasy", "Malawian",
    "Malaysian", "Maldivian", "Malian", "Maltese",
    "Marshallese", "Martiniquais", "Mauritanian", "Mauritian",
    "Mexican", "Micronesian", "Moldovan", "Monegasque",
    "Mongolian", "Montenegrin", "Montserratian", "Moroccan",
    "Mosotho", "Mozambican", "Namibian", "Nauruan", "Nepalese", "New Zealander",
    "Nicaraguan", "Nigerian", "Nigerien", "Niuean",
    "North Korean", "Northern Irish", "Norwegian", "Omani", "Pakistani", "Palauan", "Palestinian", "Panamanian",
    "Papua New Guinean", "Paraguayan", "Peruvian", "Pitcairn Islander",
    "Polish", "Portuguese", "Prydeinig", "Puerto Rican", "Qatari", "Romanian", "Russian", "Rwandan", "Salvadorean", "Sammarinese", "Samoan", "Sao Tomean",
    "Saudi Arabian", "Scottish", "Senegalese", "Serbian",
    "Citizen of Seychelles", "Sierra Leonean", "Singaporean", "Slovak",
    "Slovenian", "Solomon Islander", "Somali", "South African",
    "South Korean", "South Sudanese", "Spanish", "Sri Lankan",
    "St Helenian", "St Lucian", "Stateless", "Sudanese",
    "Surinamese", "Swazi", "Swedish", "Swiss",
    "Syrian", "Taiwanese", "Tajik", "Tanzanian", "Thai",
    "Togolese", "Tongan", "Trinidadian", "Tristanian",
    "Tunisian", "Turkish", "Turkmen", "Turks and Caicos Islander",
    "Tuvaluan", "Ugandan", "Ukrainian", "Uruguayan", "Uzbek", "Vatican citizen", "Citizen of Vanuatu", "Venezuelan", "Vietnamese",
    "Vincentian", "Wallisian", "Welsh", "Yemeni", "Zambian", "Zimbabwean"
];

const NewEmployeePersonalInfo = ( { state }: NewEmployeeChildProps ) => {
    const actor = AppContext.useActorRef();
    const [first_name, setFirstName] = useState( "" );
    const [last_name, setLastName] = useState( "" );
    const [date, setDate] = useState<Date>();
    const [nationality, setNationality] = useState<string | null>( null );
    const [province, setProvince] = useState<string>( "" );
    const [address, setAddress] = useState<string>( "" );
    const [phone, setPhone] = useState<string>( "" );
    const [email, setEmail] = useState<string>( "" );
    const [zip, setZIP] = useState<string>( "" );

    return (
        <div>
            <h2 className={"font-semibold text-center mt-2 text-white"}>Personal Info</h2>
            <InputText placeholder={"Alberto"} value={first_name} onInput={( e ) => {
                setFirstName( e.target.value );
            }} label={<BoldText text={"First Name"}/>} id={"FIRST_NAME"}/>
            <InputText placeholder={"Alberto"} value={last_name} onInput={( e ) => {
                setLastName( e.target.value );
            }} label={<BoldText text={"Last Name"}/>} id={"LAST_NAME"}/>
            <DatePick/>
            <SelectInput options={NATIONALITIES} value={nationality} placeholder={"Nationality"} onChange={
                ( option: string | null ) => {
                    setNationality( option );
                }
            }/>
            <InputText placeholder={"Alvaro Obregon"} value={province}
                       onInput={( e: React.FormEvent<HTMLInputElement> ) => {
                           setProvince( e.target.value );
                       }} label={<BoldText text={"Province"}/>} id={"PROVINCE"}/>
            <InputText placeholder={"Calle Olmo"} value={address} onInput={( e: React.FormEvent<HTMLInputElement> ) => {
                setAddress( e.target.value );
            }} label={<BoldText text={"Address"}/>} id={"ADDRESS"}/>
            <InputText placeholder={"555-555-5555"} value={phone} onInput={( e: React.FormEvent<HTMLInputElement> ) => {
                setPhone( e.target.value );
            }} label={<BoldText text={"Phone"}/>} id={"PHONE"}/>
            <InputText placeholder={"Correo@correo.com"} value={email}
                       onInput={( e: React.FormEvent<HTMLInputElement> ) => {
                           setEmail( e.target.value );
                       }} label={<BoldText text={"Email"}/>} id={"EMAIL"}/>
            <InputText placeholder={"ZIP"} value={zip} onInput={( e: React.FormEvent<HTMLInputElement> ) => {
                setZIP( e.target.value );
            }} label={<BoldText text={"ZIP"}/>} id={"ZIP"}/>
            <FormButton text={"Cancel"} onClick={( event: React.MouseEvent<HTMLButtonElement, MouseEvent> ) => {
                event.preventDefault();
                actor.send(
                    { type: "Cancel" }
                )
            }}/>
            <FormButton text={state == "Medical File" ? "Save" : "Next"}
                        onClick={( event: React.MouseEvent<HTMLButtonElement, MouseEvent> ) => {
                            event.preventDefault();
                            if ( state == "Medical File" ) {
                                actor.send(
                                    { type: "Save Employee" }
                                )
                            } else {
                                actor.send(
                                    { type: "Go Next" }
                                )
                            }
                        }}/>
        </div>
    )
}

export default NewEmployeePersonalInfo;