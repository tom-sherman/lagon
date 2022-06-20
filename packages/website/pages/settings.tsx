import { useSession } from 'next-auth/react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useSWRConfig } from 'swr';
import Button from 'lib/components/Button';
import Card from 'lib/components/Card';
import Form from 'lib/components/Form';
import Input from 'lib/components/Input';
import Layout from 'lib/Layout';
import { requiredValidator } from 'lib/form/validators';

const Settings = () => {
  const { data: session } = useSession();
  const [isUpdatingName, setIsUpdatingName] = useState(false);
  const [isUpdatingDescription, setIsUpdatingDescription] = useState(false);
  const { mutate } = useSWRConfig();

  return (
    <Layout title="Settings">
      <div className="flex flex-col gap-8">
        <Form
          initialValues={{
            name: session.organization.name,
          }}
          onSubmit={async ({ name }) => {
            setIsUpdatingName(true);

            await fetch(`/api/organizations/${session.organization.id}`, {
              method: 'PATCH',
              body: JSON.stringify({
                ...session.organization,
                name,
              }),
            });

            // TODO: mutate session.organization?
            await mutate(`/api/organizations/${session.organization.id}`);
          }}
          onSubmitSuccess={() => {
            toast.success('Organization name updated successfully.');
            setIsUpdatingName(false);
          }}
          onSubmitError={() => {
            toast.error('An error occured.');
            setIsUpdatingName(false);
          }}
        >
          <Card title="Name" description="Change the name of this Organization.">
            <div className="flex gap-2 items-center">
              <Input
                name="name"
                placeholder="Organization name"
                disabled={isUpdatingName}
                validator={requiredValidator}
              />
              <Button variant="primary" disabled={isUpdatingName} submit>
                Update
              </Button>
            </div>
          </Card>
        </Form>
        <Form
          initialValues={{
            description: session.organization.description,
          }}
          onSubmit={async ({ description }) => {
            setIsUpdatingDescription(true);

            await fetch(`/api/organizations/${session.organization.id}`, {
              method: 'PATCH',
              body: JSON.stringify({
                ...session.organization,
                description,
              }),
            });

            // TODO: mutate session.organization?
            await mutate(`/api/organizations/${session.organization.id}`);
          }}
          onSubmitSuccess={() => {
            toast.success('Organization description updated successfully.');
            setIsUpdatingDescription(false);
          }}
          onSubmitError={() => {
            toast.error('An error occured.');
            setIsUpdatingDescription(false);
          }}
        >
          <Card title="Description" description="Change the description of this Organization.">
            <div className="flex gap-2 items-center">
              <Input name="description" placeholder="Organization description" disabled={isUpdatingDescription} />
              <Button variant="primary" disabled={isUpdatingDescription} submit>
                Update
              </Button>
            </div>
          </Card>
        </Form>
        <Form
          onSubmit={async ({ email }) => null}
          onSubmitSuccess={() => {
            toast.success('Ownership of this Organization transferred successfully.');
          }}
          onSubmitError={() => {
            toast.error('An error occured.');
          }}
        >
          <Card title="Tranfer" description="Transfer the ownership of this Organization to another user?">
            <div className="flex gap-2 items-center">
              <Input name="email" placeholder="New Owner email" />
              <Button variant="danger" submit>
                Transfer ownership
              </Button>
            </div>
          </Card>
        </Form>
        <Card
          title="Delete"
          description="Delete completely this Organization, it's Functions, Deployments and Logs. This action is irreversible."
        >
          <div>
            <Button variant="danger">Delete</Button>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Settings;
