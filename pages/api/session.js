import { getActiveCar } from '../../controllers/car';
import { getJourneys } from '../../controllers/journey';
import { getUserFromEmail } from '../../controllers/user';
import { getLoginSession } from '../../lib/auth';

export default async function session(req, res) {
  const loginSession = await getLoginSession(req);

  if (!loginSession) {
    const session = { loginSession };
    res.status(200).json({ user: session || null });
    return;
  }

  const email = await loginSession.email;

  const { data: user } = await getUserFromEmail(
    encodeURIComponent(email),
    true,
    req
  );

  const { data: journey } = await getJourneys(user._id, true, req);

  const { data: car } = await getActiveCar(user._id, true, req);

  const session = {
    session: loginSession,
    user,
    journey,
    car,
  };
  res.status(200).json({ user: session || null });
}
