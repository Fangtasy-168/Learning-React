import React from "react"
import { useState } from "react"
import Data from './grocery.json' // webpack does the fetch for us with this

let Datas = Data

const SearchBar = ({ filter, stock, onInput, onCheck }) => {

    return (
        <>
            <input
                type="text"
                placeholder="Search..."
                value={filter}
                onChange={(e) => { onInput(e.target.value) }}
            ></input>
            <br></br>
            <label htmlFor="inStock"><input id="inStock" type="checkbox" onClick={() => onCheck(!stock)}></input>Only show products in stock</label>
        </>
    )
}

const ProductRow = ({ category, products }) => {

    let rows = products.map((data) => {
        if (data.category == category) {
            if (data.stocked) {
                return <tr key={data.name}><td>{data.name}</td><td>{data.price}</td></tr>
            } else {
                return <tr key={data.name}><td><span style={{ color: "red" }}>{data.name}</span></td><td>{data.price}</td></tr>
            }


        }
    })
    return (
        <>
            {rows}
        </>
    )
}

const ProductRowCategory = ({ category }) => {
    return (
        <>
            <tr >
                <th className="category" colSpan={2} key={category}>{category}</th>
            </tr>
        </>
    )
}

const ProductTable = ({ products, filter, stock }) => {
    let list = []
    let categories = []

    let modifedList = products.filter((item) => {
        console.log(item.name.toLowerCase().includes(filter))
        if (stock) {
            return item.name.toLowerCase().includes(filter) && item.stocked ? item : null
        } else {
            return item.name.toLowerCase().includes(filter) ? item : null
        }
    })

    modifedList.map((data) => {
        if (!categories.includes(data.category)) {
            categories.push(data.category)
        }
    })


    categories.forEach((cat) => {
        let component = (
            <React.Fragment key={cat}>
                <ProductRowCategory category={cat} />
                <ProductRow products={modifedList} category={cat} />
            </React.Fragment>
        )
        list.push(component)
    })

    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {list}
            </tbody>
        </table>
    )
}

const DisplayBoard = () => {
    const [userInput, setUserInput] = useState("")
    const [inStockOnly, setInStockOnly] = useState(false)

    return (
        <>
            <h1>
                Supermarket Stock
            </h1>
            <SearchBar filter={userInput} stock={inStockOnly} onInput={setUserInput} onCheck={setInStockOnly} />
            <ProductTable products={Datas} filter={userInput.toLowerCase()} stock={inStockOnly} />
        </>
    )
}

export default DisplayBoard