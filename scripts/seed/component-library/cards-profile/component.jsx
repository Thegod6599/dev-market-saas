import './component.css';

export function ProfileCard({ name, role, image, imageAlt = '', bio }) {
  return <article className="cc-profile-card">{image ? <img src={image} alt={imageAlt} /> : <div className="cc-profile-card__avatar" aria-hidden="true">{name?.slice(0, 1)}</div>}<h3>{name}</h3><p className="cc-profile-card__role">{role}</p>{bio ? <p>{bio}</p> : null}</article>;
}
