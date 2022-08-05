import { useGlobalContext } from "../../context/context"

const SetupForm = () => {
    const { handleChange,handleSubmit,quiz,error } = useGlobalContext()
    return (
        <main>
            <section className="flex justify-center">
                <form action="" className="bg-white mt-20 p-12 w-2/5 rounded-lg drop-shadow-md">
                    <h2 className="capitalize font-bold text-4xl tracking-wider text-slate-800 mb-8">setup quiz</h2>
                    <div className="form-control block space-y-2">
                        <label htmlFor="amount" className="capitalize text-slate-600 font-medium">number of questions</label>
                        <div className="mb-8">
                            <input 
                        type="number" 
                        name="amount" 
                        id="number"
                        value={quiz.amount} 
                        onChange={handleChange}
                        min={1}
                        max={50}
                        className="p-1 w-full bg-slate-100 mt-2 rounded-md focus:outline-none focus:ring focus:ring-slate-300"
                        required
                        />
                        </div>
                    </div>
                    {/* category */}
                    <div className="form-control mt-8 block">
                        <label htmlFor="category" className="capitalize text-slate-600 font-medium">category</label>
                        <div>
                            <select 
                        name="category" 
                        id="category"
                        value={quiz.category}
                        onChange={handleChange}
                        className="mt-4 p-1 w-full bg-slate-100 rounded-md focus:outline-none focus:ring focus:ring-slate-300"
                        >
                            <option value="sports">sports</option>
                            <option value="history">history</option>
                            <option value="politics">politics</option>
                        </select>
                        </div>
                    </div>
                    {/* difficulty */}
                    <div className="form-control mt-8 block">
                        <label htmlFor="difficulty" className="capitalize text-slate-600 font-medium">select difficulty</label>
                        <div>
                            <select
                        name="difficulty" 
                        id="difficulty"
                        value={quiz.difficulty}
                        onChange={handleChange}
                        className="mt-4 p-1 w-full bg-slate-100 rounded-md focus:outline-none focus:ring focus:ring-slate-300"
                        >
                            <option value="easy">easy</option>
                            <option value="medium">medium</option>
                            <option value="hard">hard</option>
                        </select>
                        </div>
                    </div>
                    {error && <p className="error">can't generate questions, please try different questions</p>}
                    <div className="flex justify-center">
                        <button type="submit" className="capitalize mt-10" onClick={handleSubmit}>
                        start
                    </button>
                    </div>
                </form>
            </section>
        </main>
    )
}

export default SetupForm