import NewEmployeeRouter from "./NewEmployeeRouter.tsx";

const NewEmployee = () => {
    return (
        <div className={"h-full overflow-y-auto relative"}>
            <h1 className={"text-white font-bold text-center leading-10 my-2"}>New Employee</h1>
            <NewEmployeeRouter/>
        </div>
    );
}

export default NewEmployee;