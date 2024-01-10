import React, { useEffect, useState } from "react";
import InputDate from "../../../../organisms/InputDate.tsx";
import SelectInput from "../../../../molecules/SelectInput.tsx";
import InputText from "../../../../atoms/InputText.tsx";
import { GeneralData } from "../../../../../logic/models/EditEmployeeMachineModels.ts";
import { EditEmployeeContext } from "../../../../../logic/ActorContexts.ts";
import EditEmployeeWrapper from "../../../../organisms/EditEmployeeWrapper.tsx";
import { UserIcon, EnvelopeIcon, MapPinIcon, PhoneIcon } from "@heroicons/react/24/solid";

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

const EditEmployeePersonalInfo = () => {
    const context = EditEmployeeContext.useSelector( state => state.context );
    const actor = EditEmployeeContext.useActorRef();
    const [data, setData] = useState<GeneralData | null>( context.general_data ? context.general_data : null );
    const [first_name, setFirstName] = useState( () => {
        if ( context.general_data != null ) {
            return context.general_data.first_name;
        }
        return "";
    } );
    const [last_name, setLastName] = useState( () => {
        if ( context.general_data != null ) {
            return context.general_data.last_name;
        }
        return "";
    } );
    const [date, setDate] = useState<Date | null>( () => {
        if ( context.general_data != null ) {
            return context.general_data.birthday;
        }
        return null;
    } );
    const [nationality, setNationality] = useState<string | null>( () => {
        return "Mexican"
    } );
    const [province, setProvince] = useState<string>( () => {
        if ( context.general_data != null ) {
            return context.general_data.province;
        }
        return "";
    } );
    const [phone, setPhone] = useState<string>( () => {
        if ( context.general_data != null ) {
            return context.general_data.phone;
        }
        return "";
    } );
    const [email, setEmail] = useState<string>( () => {
        if ( context.general_data != null ) {
            return context.general_data.email;
        }
        return "";
    } );
    const [zip, setZIP] = useState<string>( () => {
        if ( context.general_data != null ) {
            return context.general_data.zip;
        }
        return "";
    } );
    const [city, setCity] = useState<string>( context.general_data?.city || "" );
    const [ext, setExt] = useState<number>( context.general_data?.ext || 0 );
    const [street, setStreet] = useState<string>( context.general_data?.street || "" );
    const [cellphone, setCellphone] = useState<number>( context.general_data?.cellphone || 0 );
    const [country, setCountry] = useState<string>( context.general_data?.country || "" );
    const [int, setInt] = useState<number>( context.general_data?.int || 0 );
    const [settlement, setSettlement] = useState<string>( context.general_data?.settlement || "" );

    useEffect( () => {
        console.log( "Edit Employee Personal Info", data )
        setData( {
            birthday: date,
            email: email,
            first_name: first_name,
            last_name: last_name,
            nationality: nationality,
            phone: phone,
            province: province,
            zip: zip,
            city: city,
            ext: ext,
            street: street,
            cellphone: cellphone,
            country: country,
            int: int,
            settlement: settlement
        } )
    }, [first_name, last_name, date, nationality, province, phone, email, zip, city, ext, street, cellphone, country, int, settlement] );

    useEffect( () => {
        console.log( "Personal Info Saved" )
        actor.send( {
            type: "Go Personal Info",
            data: data as GeneralData
        } )
    }, [data] );

    return (
        <EditEmployeeWrapper data={data}>
            <div className={"font-bold w-fit mx-auto text-blue-700 text-lg mt-8"}>
                <UserIcon
                    className={"m-auto inline w-6 h-6 ml-6 mr-4"}/>
                <span>Basic</span>
            </div>
            <div className={"flex flex-row p-5 w-full items-center justify-evenly"}>
                <div className={"flex flex-col justify-center items-center grow px-6"}>
                    <InputText placeholder={"Alberto"} value={first_name} onInput={( e ) => {
                        setFirstName( e.currentTarget.value );
                    }} label={<span className={"font-semibold text-blue-700 select-none"}>First Name</span>}
                               id={"FIRST_NAME"}/>
                    <InputText placeholder={"Fernandez"} value={last_name} onInput={( e ) => {
                        setLastName( e.currentTarget.value );
                    }} label={<span className={"font-semibold text-blue-700 select-none"}>Last Name</span>}
                               id={"LAST_NAME"}/>
                </div>
                <div className={"flex flex-col items-center px-10 justify-center"}>
                    <div className={"my-5"}>
                        <InputDate value={date} label={"Birthday"} placeholder={"Enter a date"}
                                   onChange={( date: Date | null ) => {
                                       setDate( current => {
                                           if ( date == null ) {
                                               return null;
                                           } else {
                                               current = date;
                                               return new Date( current.getFullYear(), current.getMonth(), current.getDate() );
                                           }
                                       } );
                                   }} options={{
                            canBeEmpty: true,
                            max_year: ( new Date().getFullYear() ) - 18,
                            min_year: ( new Date().getFullYear() ) - 82
                        }}/>
                    </div>
                    <div className={"my-5"}>
                        <SelectInput options={NATIONALITIES} default_value={"Mexican"} value={nationality}
                                     placeholder={"Nationality"} onChange={
                            ( option: string | null ) => {
                                setNationality( option );
                            }
                        }/>
                    </div>
                </div>
            </div>
            <div className={"font-bold w-fit mx-auto text-blue-700 text-lg mb-4"}>
                <PhoneIcon
                    className={"m-auto inline w-6 h-6 ml-6 mr-4"}/>
                <span>Contact</span>
            </div>
            <div className={"flex flex-row px-10 items-center"}>
                <div className={"w-full flex flex-row"}>
                    <InputText placeholder={"emailo@email.com"} value={email}
                               onInput={( e: React.FormEvent<HTMLInputElement> ) => {
                                   setEmail( e.currentTarget.value );
                               }} label={<EnvelopeIcon className={"text-blue-700 w-6 h-6 mr-4"}/>}
                               id={"EMAIL"}/>
                </div>
                <InputText placeholder={"555-555-5555"} value={phone}
                           onInput={( e: React.FormEvent<HTMLInputElement> ) => {
                               setPhone( e.currentTarget.value );
                           }} label={<span className={"font-semibold text-blue-700 select-none mx-4"}>Phone</span>}
                           id={"PHONE"}/>
                <InputText placeholder={"555-555-5555"} value={cellphone.toString()}
                           onInput={( e ) => setCellphone( Number( e.currentTarget.value ) )}
                           label={<span
                               className={"font-semibold text-blue-700 select-none mx-4 w-fit"}>Cellphone</span>}
                           id={"CELLPHONE"}/>
            </div>
            <div className={"font-bold w-fit mx-auto text-blue-700 text-lg mt-4"}>
                <MapPinIcon
                    className={"m-auto inline w-6 h-6 ml-6 mr-4"}/>
                <span>Address</span>
            </div>
            <div className={"flex flex-row px-10 items-center"}>
                <InputText placeholder={"State"} value={country} onInput={( e ) => setCountry( e.currentTarget.value )}
                           label={<span className={"font-semibold text-blue-700 select-none mr-4"}>State</span>}
                           id={"COUNTRY"}/>
                <InputText placeholder={"City"} value={city} onInput={( e ) => setCity( e.currentTarget.value )}
                           label={<span className={"font-semibold text-blue-700 select-none mx-4"}>City</span>}
                           id={"CITY"}/>
            </div>
            <div className={"flex flex-row px-10 items-center"}>
                <InputText placeholder={"Alvaro Obregon"} value={province}
                           onInput={( e: React.FormEvent<HTMLInputElement> ) => {
                               setProvince( e.currentTarget.value );
                           }} label={<span className={"font-semibold text-blue-700 select-none mr-4"}>Province</span>}
                           id={"PROVINCE"}/>
                <InputText placeholder={"Settlement"} value={settlement}
                           onInput={( e ) => setSettlement( e.currentTarget.value )}
                           label={<span className={"font-semibold text-blue-700 select-none mx-4"}>Settlement</span>}
                           id={"SETTLEMENT"}/>
                <InputText placeholder={"ZIP"} value={zip} onInput={( e: React.FormEvent<HTMLInputElement> ) => {
                    setZIP( e.currentTarget.value );
                }} label={<span className={"font-semibold text-blue-700 select-none mx-4"}>ZIP</span>} id={"ZIP"}/>
            </div>
            <div className={"flex flex-row px-10 items-center"}>
                <InputText placeholder={"Street"} value={street} onInput={( e ) => setStreet( e.currentTarget.value )}
                           label={<span className={"font-semibold text-blue-700 select-none mr-4"}>Street</span>}
                           id={"STREET"}/>
                <div className={"w-4/6 flex flex-row"}>
                    <InputText placeholder={"Ext"} value={ext.toString()}
                               onInput={( e ) => setExt( Number( e.currentTarget.value ) )}
                               label={<span className={"font-semibold text-blue-700 select-none mx-4"}>Ext</span>}
                               id={"EXT"}/>
                    <InputText placeholder={"Int"} value={int.toString()}
                               onInput={( e ) => setInt( Number( e.currentTarget.value ) )}
                               label={<span className={"font-semibold text-blue-700 select-none mx-4 w-fit"}>Int</span>}
                               id={"INT"}/>
                </div>
            </div>
        </EditEmployeeWrapper>
    )
}

export default EditEmployeePersonalInfo;