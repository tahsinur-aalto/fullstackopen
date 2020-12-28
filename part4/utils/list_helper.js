const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, { likes }) => sum + likes, 0)
}

const favoriteBlog = (blogs) =>  blogs.reduce((x, y) => {
    return x.likes > y.likes
    ? {title: x.title, author: x.author, likes: x.likes}
    : {title: y.title, author: y.author, likes: y.likes}
})


const mostBlogs = (blogs) => {
    let sum = {}
    let max = 0;
    let max_author;
  
    blogs.forEach((blog, i) => {
      const author = blog.author
      if (sum[author] === undefined) {
        sum[author] = 1
      } else {
        sum[author] = sum[author] + 1
      }
      
      if (sum[author] > max) {
        max = sum[author]
        max_author = blogs[i].author
      }
    })
  
    return {
      author: max_author,
      blogs: max //number of blogs
    }
  }

  const mostLikes = (blogs) => {
    let total = 0
  
    const mostPopular = blogs.reduce((x, y) => x.likes > y.likes
      ? x
      : y 
    )
  
    blogs.forEach(blog => blog.author === mostPopular.author
      ? total += blog.likes
      : 0
    )
  
    return {
      author: mostPopular.author,
      likes: total
    }
  }

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}