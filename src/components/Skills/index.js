const Skills=(props)=>{
  const {skill}=props
  const {imageUrl,name}=skill
    return(
      <li>
        <img src={imageUrl} alt={name} />
      </li>
    )
}

export default Skills;