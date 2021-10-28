import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import Link from 'next/link'
import { useRouter } from "next/router";
import {useQuery, gql} from '@apollo/client'

const CATEGORY_REVIEW = gql`
    query CategoryofReview($id: ID!){
        category(id: $id){
            name,
            id,
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
    }
`

export default function CategoryReview() {
  const router = useRouter();
  const param = router.query.id;

  const {loading, error, data } = useQuery(CATEGORY_REVIEW,{
      variables: {id: parseInt(param)}
  });


  if(loading) return <p>Loading......</p>
  if(error) return <p>Error :(</p>

    
  return (
    <div className={styles.container}>
        <Head>
            <title>Create Next App</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <h1>Reviews of category: {data.category.name}</h1>
  
        <div>
            {
                data.category.reviews.map(review=>(
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
                        <p>{review.body}</p>
                    </div>
                ))
            }
            <Link href={`/reviews`}><span style={{color:'blue', cursor: 'pointer'}}>Back</span></Link>
        </div>
        
    </div>
  )
}