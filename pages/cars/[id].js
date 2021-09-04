import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Cars({ car }) {
    const router = useRouter();
    const { id } = router.query;

    return (
        <>
            <Head>
                <title>{car.color}</title>
            </Head>
            <h1>Hello {id}</h1>
            <img src={car.image} style={{"width":"400px"}}/>
        </>
        )
}


/**
 * This function does the same as getStaticProps but it regenerates components based on request
 */
// export async function getServerSideProps() {
//     const req = await fetch(`http://localhost:3000/${params.id}.json`);
//     const data = await req.json();

//     return {
//         props: { car: data},
//     }
// }

//tells nextjs to prerender page
export async function getStaticProps({ params }){

    const req = await fetch(`http://localhost:3000/${params.id}.json`);
    const data = await req.json();

    return {
        props: { car: data},
    }
}

/**
 * Tells NextJS which dynamic pages to render
 * 
 * it can fetch from an api as well and it's job is to return an array of paths
 */
export async function getStaticPaths(){
    const req = await fetch('http://localhost:3000/cars.json');
    const data = await req.json();

    const paths = data.map(car => {
        return { params: { id: car} }
    })

    return {
        paths,
        fallback: false
    }
}