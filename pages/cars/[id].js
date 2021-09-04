import { useRouter } from 'next/router';

export default function Cars() {
    const router = useRouter();
    const { id } = router.query;

    return <h1>Hello {id}</h1>
}