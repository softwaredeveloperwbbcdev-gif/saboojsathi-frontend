import { Link } from '@inertiajs/react'
import React from 'react'

function Pagination({links,queryParams = null}) {
  queryParams = queryParams || {};
  let uri = '';
  uri += queryParams.sort_direction ? '&sort_direction='+ queryParams.sort_direction : '';
  uri += queryParams.sort_field ? '&sort_field='+ queryParams.sort_field : '';
  uri += queryParams.name ? '&name='+ queryParams.name : '';
  uri += queryParams.status ? '&status='+ queryParams.status : '';
  console.log(queryParams.sort_direction);
  return (
    <nav className="text-center mt-4">
      {links.map((link) => (
        <Link 
        preserveScroll
        href={link.url + uri || ""}
        key={link.label} 
        className={"inline-block py-2 px-3 rounded-lg text -gray-200 text-xs " + (link.active ? "bg-gray-950 " : " ") + (!link.url ? "!text-gray-500 cusrsor-not-allowed " : "hover:bg-gray-950")} dangerouslySetInnerHTML={{__html:link.label}}></Link>
      ))}
    </nav>
  )
}

export default Pagination
