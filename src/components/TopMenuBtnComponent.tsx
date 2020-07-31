import React from 'react'


const TopMenuBtnComponent: React.FC<{btnText:string}>=({btnText})=>{

    return(
        <div className="TopMenuBtnContainer">
            
            <a href='/signin'>
            <button>
                {btnText}
                
            </button>
            </a>
        </div>
    )
}

export default TopMenuBtnComponent