import { Post } from './Post'

export const Feed = () => {
  const posts = [
    {
      id: 1,
      authorId: 1,
      title: "Test",
      content : "Lorem ipsum dolor sit amet, consectetur adipiscing elit fahfdh  jatrj aet weg janw nhjaer haejrn jaenrg aerng jerang jaen aenhearjn hanerj hnyhaejrnh janerkjhaeskjrhn akejrnh kajen",
      image: null
    },
    {
      id: 2,
      authorId: 2,
      title: "Test 2",
      content : "Lorem ipsum dolor sit amet, consectetur adipiscing elit fahfdh  jatrj aet weg janw nhjaer haejrn jaenrg aerng jerang jaen aenhearjn hanerj hnyhaejrnh janerkjhaeskjrhn akejrnh kajen",
      image: 'src/assets/images/background-landing-page.jpg'
    }
  ];

  return (
    <div className='feed'>
      {posts?.map(post =>
        <div key={post.id} className='post-container'>
          <div className='line'>&nbsp;</div>
          <Post post={post}/>
        </div>
      )}
    </div>
  )
}
