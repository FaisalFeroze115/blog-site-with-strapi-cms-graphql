import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import useFetch from '../../hooks/useFetch'
import Category from '../../components/Category'
import Link from 'next/link'
import {useQuery, gql} from '@apollo/client'

const REVIEWS = gql`
    query GetReviews{
        reviews{
            title,
            body,
            rating,
            id,
            categories{
                name,
                id
            }

        }
    }
`

export default function Reviews() {
  //const {loading, error, data } = useFetch('http://localhost:1337/reviews');
  const {loading, error, data } = useQuery(REVIEWS);
    
  if(loading) return <p>Loading......</p>
  if(error) return <p>Error :(</p>
    
  return (
    <div className={styles.container}>
        <Head>
            <title>Create Next App</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <h1>All Reviews</h1>
        <Category/>
        <div>
            {data.reviews.map(review=>(
                <div key={review.id} style={{marginBottom: '10px', borderBottom: '1px solid #ccc', paddingBottom: '15px'}}>
                    <p style={{marginBottom: '0'}}>{review.rating}</p>
                    <h2 style={{marginTop: '5px'}}>{review.title}</h2>
                    <small>
                            {
                                review.categories.map(cat=>(
                                    <span key={cat.id}>{cat.name} </span>
                                ))
                            }
                    </small>
                    <p>{review.body.substring(0,200)}.....</p>
                    <Link href={`reviews/${review.id}`}><span style={{color:'blue', cursor: 'pointer'}}>Read More</span></Link>
                </div>
            ))}
        </div>
        
    </div>
  )
}
