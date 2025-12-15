import { getLocale } from "next-intl/server"
import getRequest from "../../../../helpers/get"
import { notFound } from "next/navigation"

async function Page({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params
  const locale = await getLocale()
  const content = await getRequest(`/core/pages/key/${slug}`, {}, null, locale)
  if(!content?.data?.html) {
    notFound()
  }
  return (
  <>
 <div>
 {content?.data?.css && (
        <style
          dangerouslySetInnerHTML={{
            __html: `
              .cms-content {
                all: revert;
              }

              .cms-content ${content?.data?.css}
            `,
          }}
        />
      )}
  <div dangerouslySetInnerHTML={{__html: content?.data?.html}}>
      
    </div>

 </div>
  </>
  )
}

export default Page
