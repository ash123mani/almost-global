export default function Search() {
    return (
        <div>
            <main>
                <form>
                    <fieldset>
                        <legend>Search country by name</legend>
                        <div>
                            <label htmlFor="name-based">Enter name</label>
                            <input name="query-name" id="name-based" type="text" placeholder="Enter name" required  minLength={3} />
                        </div>
                    </fieldset>
                </form>
            </main>
        </div>
    )
}