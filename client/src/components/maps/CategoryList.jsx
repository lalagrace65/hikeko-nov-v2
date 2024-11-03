import Data from '../../Shared/Data'
import { useState } from 'react'


function CategoryList({onChangeCategory}) {
    const [categoryList,setCategoryList]=useState(Data.CategoryListData);
    const [selectedCategory,setSelectedCategory]=useState();
  return (
    <div>
        <h2>Select Types</h2>
        <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3'>
            {categoryList.map((item,index)=>(
                <div 
                key={item.id || index}
                className={`flex flex-col justify-center items-center bg-gray-100
                p-2 m-2 rounded-lg grayscale hover:grayscale-0 cursor-pointer border-red-400
                ${selectedCategory==index? 'grayscale-0 border-[1px]':null}`}
                onClick={()=>{setSelectedCategory(index);onChangeCategory(item.value)}}
                >
                    <img src={item.icon}
                    alt={item.name}
                    width={50}
                    height={50}
                    />
                    <h2>{item.name}</h2>
                </div>
            ))}
        </div>
    </div>

  )
}

export default CategoryList;