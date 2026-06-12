import { withAppErrorBoundary } from '@/hoc/withAppErrorBoundary'

function HomePage() {
    throw Error('WAZAAAAAAAAAAAAAAAAA');
    return (
        <>
        <p>
            HomePage
        </p>
        </>
    )
}

export default withAppErrorBoundary(HomePage);