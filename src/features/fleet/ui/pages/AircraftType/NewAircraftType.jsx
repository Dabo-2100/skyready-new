export default function NewAircraftType() {
    return (
        <div className="flex flex-col w-full h-full overflow-auto">
            <div className="flex flex-col w-full h-full overflow-auto">
                <div className="flex justify-between items-center p-4">
                    <h1 className="text-2xl font-bold p3">New Aircraft Type</h1>
                </div>
                <div className="flex flex-col w-full h-full overflow-auto">
                    <div className="flex p-4 w-full">
                        <div className="w-full overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                            <form>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input type="text" className="input input-bordered" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
