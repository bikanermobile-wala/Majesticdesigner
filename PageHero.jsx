// Dark editorial page header. The navigation sits on top of it, exactly like the homepage hero.
export default function PageHero({ title, lead, image, imageAlt = '', position = 'center 25%' }) {
  return (
    <section className={`phero ${image ? 'phero--image' : ''}`}>
      <div className="phero__text wrap">
        <h1 className="phero__title">
          <span className="phero__mask"><span className="phero__line">{title}</span></span>
        </h1>
        {lead && <p className="phero__lead lead">{lead}</p>}
      </div>
      {image && (
        <div className="phero__media">
          <img src={image} alt={imageAlt} style={{ objectPosition: position }} fetchpriority="high" />
        </div>
      )}
    </section>
  )
}
