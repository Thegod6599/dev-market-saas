import './component.css';

export function EditorialTestimonial({ quote = 'The work finally feels as considered as the ideas behind it. We found our pace, and the details stopped getting lost along the way.', author = 'Mara Ellis', role = 'Creative Director', organization = 'Fieldwork Studio', context = 'A better way to make room for good work', portrait, className = '' }) {
  return <figure className={`cc-testimonial ${className}`}>
    <div className="cc-testimonial__top"><span>IN THEIR WORDS</span><span aria-hidden="true">“</span></div>
    <blockquote>{quote}</blockquote>
    <figcaption><span className="cc-testimonial__rule" aria-hidden="true" />{portrait ? <img src={portrait} alt="" /> : <span className="cc-testimonial__initials" aria-hidden="true">{author.split(/\s+/).map((part) => part[0]).slice(0, 2).join('')}</span>}<span className="cc-testimonial__author"><strong>{author}</strong><small>{role}{organization ? ` · ${organization}` : ''}</small></span></figcaption>
    {context && <p className="cc-testimonial__context">{context}</p>}
  </figure>;
}