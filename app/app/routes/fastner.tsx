import { ProfileHead, ProjectList } from "~/components/profile";

export default function ProfileFastner() {
  return (
    <section>
      <ProfileHead name="Sebastian Fastner"/>
      <ProjectList data={data} encodeDataAttribute={encodeDataAttribute} />
    </section>
  )
}
