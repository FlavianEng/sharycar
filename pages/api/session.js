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

  const { data: user } = await getUserFromEmail(email, true, req);

  const session = {
    session: loginSession,
    user: user,
  };
  res.status(200).json({ user: session || null });
}
