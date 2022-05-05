import React from 'react'

function Communities() {
    return (
        <div className="right-container">
            <div className="communities">
                <div className="comm">
                    <div className="comm-header">
                        <p>Top Communities</p>
                    </div>
                    <div className="rows"><i style={{ color: "#04eb04" }} class="fa-solid fa-angle-up"></i>p/Crabs</div>
                    <div className="rows"><i style={{ color: "#04eb04" }} class="fa-solid fa-angle-up"></i>p/Armidillos</div>
                    <div className="rows"><i style={{ color: "red" }} class="fa-solid fa-angle-down"></i>p/Sugar_gliders</div>
                    <div className="rows"><i style={{ color: "#04eb04" }} class="fa-solid fa-angle-up"></i>p/Dogs</div>
                    <div className="rows"><i style={{ color: "red" }} class="fa-solid fa-angle-down"></i>p/Cats</div>
                    <div className="rows"><i style={{ color: "#04eb04" }} class="fa-solid fa-angle-up"></i>p/Giraffe</div>
                    <div className="rows"><i style={{ color: "#04eb04" }} class="fa-solid fa-angle-up"></i>p/Squirrel</div>
                    <button id="view-all">Veiw All</button>
                </div>
            </div>

            <div className="createe">
                <div className="links">
                    <h5>Personal Links</h5>
                    <a href='https://github.com/k-dodsonknapp'>GitHub</a>
                    <a href="https://www.linkedin.com/in/kenneth-dodson-knapp-97029022a/">LinkedIn</a>
                    <a href="https://angel.co/u/kenneth-dodson-knapp">AngelList</a>
                </div>
                <div className="links">
                    <h5>Previous Projects</h5>
                    <a href='https://notes-takker.herokuapp.com/'>NoteTakker</a>
                    <a href='http://step-by-stepapp.herokuapp.com/'>Step-by-Step</a>
                    <a href='https://carra.herokuapp.com/'>Carra</a>
                </div>
            </div>
            <div className="me">
                <p>Developed by: Kenneth Dodson-Knapp</p>
            </div>
        </div>
    )
}

export default Communities;