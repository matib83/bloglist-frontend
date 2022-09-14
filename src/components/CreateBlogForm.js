import React from 'react'

const CreateBlogForm = ({
  addBlog,
  title, setTitle,
  author, setAuthor,
  url, setUrl
  }) => {
  return (
    <div>
      <h2>create new</h2>

      <form onSubmit={addBlog}>
      <div>  
      title: 
        <input
          placeholder='Title'
          value={title}
          onChange={({target}) => setTitle(target.value)}
        />
      </div>
      <div>
        author: 
        <input
          placeholder='Author'
          value={author}
          onChange={({target}) => setAuthor(target.value)}
        />
      </div>
      <div>
        url: 
        <input
          placeholder='Url'
          value={url}
          onChange={({target}) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
      </form> 
    </div>
  )
}

export default CreateBlogForm