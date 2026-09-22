export function ProfileCard({ name, role, image }) {
  return <article><img src={image} alt="" /><h3>{name}</h3><p>{role}</p></article>;
}