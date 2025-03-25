import { Search } from 'lucide-react'
import React from 'react'

const SearchBox = () => {
    return (
        <div>
            <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                    type="text"
                    placeholder={`Search User on Yaario`}
                    className="w-full pl-10 pr-4 py-2 bg-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
        </div>
    )
}

export default SearchBox
