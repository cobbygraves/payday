// export default async function sitemap() {
//   // all the urls connected to your app should be included in your sitemap
//   const allPosts = await (
//     await fetch('https://jsonplaceholder.typicode.com/posts')
//   ).json()
//   const posts = allPosts.map((post) => ({
//     url: `${process.env.HOST}/post/${post.id}`,
//     lastModified: new Date().toISOString()
//   }))
//   const routes = ['/', '/about', '/contact'].map((route) => ({
//     url: `${process.env.HOST}/${route}`,
//     lastModified: new Date().toISOString()
//   }))
//   return [...posts, ...routes]
// }
