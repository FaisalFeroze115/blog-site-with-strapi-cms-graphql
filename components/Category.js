import React from 'react'
import {useQuery, gql} from '@apollo/client'
import Link from 'next/link'

const CATEGORIES = gql`
    query GetCategories{
        categories{
            name,
            id
        }
    }
`

function Category() {
    const { loading, error, data  } = useQuery(CATEGORIES);

    if(loading) return <p>Loading......</p>
    if(error) return <p>Error :(</p>

    return (
        <div style={flex}>
            {
                data.categories.map(category=>(
                    <Link key={category.id} href={`/category/${category.id}`}>
                        <p style={{marginRight: '8px', cursor: 'pointer', color: 'blue'}}>{category.name}</p>
                    </Link>
                ))
            }
        </div>
    )
}

const flex = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}

export default Category

