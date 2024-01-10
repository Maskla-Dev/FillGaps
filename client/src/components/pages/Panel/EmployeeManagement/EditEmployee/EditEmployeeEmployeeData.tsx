import { useEffect, useState } from "react";
import InputText from "../../../../atoms/InputText.tsx";
import SelectInput from "../../../../molecules/SelectInput.tsx";
import { Departments, Roles } from "../../../../../logic/models/EmployeesManagementModels.ts";
import InputDate from "../../../../organisms/InputDate.tsx";
import PDFUpload from "../../../../molecules/PDFUpload.tsx";
import { WorkerData } from "../../../../../logic/models/EditEmployeeMachineModels.ts";
import { EditEmployeeContext } from "../../../../../logic/ActorContexts.ts";
import EditEmployeeWrapper from "../../../../organisms/EditEmployeeWrapper.tsx";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";

const EditEmployeeEmployeeData = () => {
    const context = EditEmployeeContext.useSelector( state => state.context );
    const actor = EditEmployeeContext.useActorRef();
    const [salary, setSalary] = useState<string>( () => {
        if ( context.worker_data != null ) {
            return context.worker_data.salary;
        }
        return "";
    } );
    const [workArea, setWorkArea] = useState<string | null>( () => {
        if ( context.worker_data != null ) {
            return context.worker_data.department;
        }
        return null;

    } );
    const [position, setPosition] = useState<string | null>( () => {
        if ( context.worker_data != null ) {
            return context.worker_data.role;
        }
        return null;
    } );
    const [contractEnd, setContractEnd] = useState<Date | null>( () => {
        if ( context.worker_data != null ) {
            return context.worker_data.contractEnd;
        }
        return new Date();
    } );
    const [contractProof, setContractProof] = useState<string | ArrayBuffer | null>( () => {
        if ( context.worker_data != null ) {
            return context.worker_data.contractProof;
        }
        return null;
    } );
    const [bank, setBank] = useState<string>( context.worker_data?.bank || "" );
    const [bankAccount, setBankAccount] = useState<number>( context.worker_data?.bank_account || 0 );
    const [clabe, setClabe] = useState<number>( context.worker_data?.clabe || 0 );
    const [endJourney, setEndJourney] = useState<Date | null>( context.worker_data?.end_journey || null );
    const [endJourneyMinutes, setEndJourneyMinutes] = useState<string>( "00" );
    const [initJourney, setInitJourney] = useState<Date | null>( context.worker_data?.init_journey || null );
    const [initJourneyMinutes, setInitJourneyMinutes] = useState<string>( "00" );
    const [since, setSince] = useState<Date | null>( context.worker_data?.since || null );
    const [data, setData] = useState<WorkerData | null>( context.worker_data );

    useEffect( () => {
        setData( {
            contractProof: contractProof,
            contractEnd: contractEnd,
            role: position,
            department: workArea,
            salary: salary,
            bank: bank,
            bank_account: bankAccount,
            clabe: clabe,
            end_journey: endJourney,
            init_journey: initJourney,
            since: since
        } );
    }, [salary, workArea, position, contractEnd, contractProof, bank, bankAccount, clabe, endJourney, initJourney, since] );

    useEffect( () => {
        console.log( "Worker Data Saved" )
        actor.send( {
            type: "Go Worker Data",
            data: data as WorkerData
        } )
    }, [data] );

    return (
        <EditEmployeeWrapper data={data}>
            <div className={"flex items-center justify-evenly mt-8"}>
                <div className={"w-2/4"}>
                    <InputText placeholder={"$1000"} value={salary} onInput={( e ) => {
                        setSalary( e.currentTarget.value );
                    }} label={<CurrencyDollarIcon className={"text-blue-700 w-12 h-12 mr-4"}/>} id={"SALARY"}/>
                </div>
                <SelectInput options={Departments} value={workArea} placeholder={"Work Area"} onChange={
                    ( option: string | null ) => {
                        setWorkArea( option );
                    }
                }/>
                <SelectInput options={Roles} value={position} placeholder={"Role"} onChange={
                    ( option: string | null ) => {
                        setPosition( option );
                    }
                }/>
            </div>
            <div className={"flex justify-evenly my-12 items-center"}>
                <InputDate
                    onChange={( date: Date | null ) => {
                        setSince( date );
                    }}
                    label={"Since"}
                    value={since}
                    placeholder={"Enter a date"}
                    options={{
                        canBeEmpty: false,
                        max_year: new Date().getFullYear(),
                        min_year: 1960
                    }}
                />
                <InputDate
                    onChange={( date: Date | null ) => {
                        setContractEnd( current => {
                            if ( date == null ) {
                                return null;
                            } else {
                                current = date;
                                return new Date( current.getFullYear(), current.getMonth(), current.getDate() );
                            }
                        } );
                    }}
                    label={"Contract End"}
                    value={contractEnd}
                    placeholder={"Enter a date"}
                    options={{
                        canBeEmpty: false,
                        max_year: 2040,
                        min_year: 1960
                    }}/>
                <PDFUpload onPDFSelect={( value ) => setContractProof( value )} label={"Contract"}
                           value={contractProof}/>
            </div>
            <div className={"flex justify-evenly my-12"}>
                <div className={"flex flex-row items-center pl-4 py-2 bg-violet-200 w-fit rounded justify-around"}>
                    <span className={"block w-1/6 text-violet-800 text-center font-semibold"}>Start work time</span>
                    <div className={"flex w-full justify-evenly"}>
                        <SelectInput placeholder={"Init Journey"}
                                     value={initJourney ? initJourney.getHours().toString() : String( 7 )}
                                     options={new Array( 18 ).fill( 0 ).map( ( _, index ) => {
                                         return ( index + 6 ).toString()
                                     } )}
                                     onChange={( option: string | null ) => {
                                         setInitJourney( current => {
                                             if ( option == null ) {
                                                 return null;
                                             } else {
                                                 if ( current == null ) {
                                                     current = new Date();
                                                 }
                                                 current = new Date( current.getFullYear(), current.getMonth(), current.getDate() );
                                                 current.setHours( Number( option ) );
                                                 return current;
                                             }
                                         } );
                                     }}/>
                        <SelectInput placeholder={"Init Journey"}
                                     value={initJourneyMinutes}
                                     options={new Array( 60 ).fill( 0 ).map( ( _, index ) => {
                                         return index.toString().padStart( 2, '0' );
                                     } )}
                                     onChange={( option: string | null ) => {
                                         setInitJourneyMinutes( option || "00" );
                                     }} default_value={"00"}
                        />
                    </div>
                </div>
                <div className={"flex flex-row items-center pl-4 py-2 bg-violet-200 w-fit rounded justify-around"}>
                    <span className={"block w-1/6 text-violet-800 text-center font-semibold"}>End work time</span>
                    <div className={"flex w-full justify-evenly"}>
                        <SelectInput placeholder={"End Journey"}
                                     value={endJourney ? endJourney.getHours().toString() : String( 7 )}
                                     options={new Array( 16 ).fill( 0 ).map( ( _, index ) => {
                                         return ( index + 7 ).toString()
                                     } )}
                                     onChange={( option: string | null ) => {
                                         setEndJourney( current => {
                                             if ( option == null ) {
                                                 return null;
                                             } else {
                                                 if ( current == null ) {
                                                     current = new Date();
                                                 }
                                                 current = new Date( current.getFullYear(), current.getMonth(), current.getDate() );
                                                 current.setHours( Number( option ) );
                                                 return current;
                                             }
                                         } );
                                     }}/>
                        <SelectInput placeholder={"End Journey"}
                                     value={endJourneyMinutes}
                                     options={new Array( 60 ).fill( 0 ).map( ( _, index ) => {
                                         return index.toString().padStart( 2, '0' );
                                     } )}
                                     onChange={( option: string | null ) => {
                                         setEndJourneyMinutes( option || "00" );
                                     }} default_value={"00"}
                        />
                    </div>
                </div>
            </div>
            <div className={"flex px-12 my-12"}>
                <InputText placeholder={"Bank"} value={bank} onInput={( e ) => setBank( e.currentTarget.value )}
                           label={<span className={"font-semibold text-blue-700 select-none mr-4"}>Bank</span>}
                           id={"BANK"}/>
                <InputText placeholder={"Bank Account"} value={bankAccount.toString()}
                           onInput={( e ) => setBankAccount( Number( e.currentTarget.value ) )}
                           label={<span className={"font-semibold text-blue-700 select-none mx-4"}>Bank Account</span>}
                           id={"BANK_ACCOUNT"}/>
                <InputText placeholder={"Clabe"} value={clabe.toString()}
                           onInput={( e ) => setClabe( Number( e.currentTarget.value ) )}
                           label={<span className={"font-semibold text-blue-700 select-none mx-4"}>CLABE</span>}
                           id={"CLABE"}/>
            </div>

        </EditEmployeeWrapper>
    )
}

export default EditEmployeeEmployeeData;