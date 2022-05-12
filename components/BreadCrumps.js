import { useRouter } from 'next/router';
import Link from 'next/link'

export default function NextBreadcrumbs() {
    // Gives us ability to load the current route details
    const router = useRouter();

    function generateBreadcrumbs() {
        // Remove any query parameters, as those aren't included in breadcrumbs
        const asPathWithoutQuery = router.asPath.split("?")[0];

        // Break down the path between "/"s, removing empty entities
        // Ex:"/my/nested/path" --> ["my", "nested", "path"]
        const asPathNestedRoutes = asPathWithoutQuery.split("/")
            .filter(v => v.length > 0);

        // Iterate over the list of nested route parts and build
        // a "crumb" object for each one.
        const crumblist = asPathNestedRoutes.map((subpath, idx) => {
            // We can get the partial nested route for the crumb
            // by joining together the path parts up to this point.
            const href = "/" + asPathNestedRoutes.slice(0, idx + 1).join("/");
            // The title will just be the route string for now
            const text = subpath;
            return { href, text };
        })

        // Add in a default "Home" crumb for the top-level
        return [{ href: "/", text: "Home" }, ...crumblist];
    }

    // Call the function to generate the breadcrumbs list
    const breadcrumbs = generateBreadcrumbs();



    return (
        <div className="container m-auto">
            <div className="flex gap-3 items-center mb-6">
                {breadcrumbs.map((crumb, idx) => (
                    <Crumb {...crumb} key={idx} last={idx === breadcrumbs.length - 1} />
                ))}
            </div>
        </div>
    );
}


// Each individual "crumb" in the breadcrumbs list
function Crumb({ text, href, last = false }) {
    // The last crumb is rendered as normal text since we are already on the page
    if (last) {
        return <p className="text-blue-500">{text}</p>
    }

    // All other crumbs will be rendered as links that can be visited 
    return (
        <Link href={href}>
            <p className="flex items-center text-gray-600 cursor-pointer">
                {text}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
            </p>
        </Link>
    );
}