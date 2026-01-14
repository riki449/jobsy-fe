import Button from "@/src/components/common/Button";
import { JobItem } from "@/src/features/jobs/types";
import {
  CheckCircleFilled,
  ClockCircleOutlined,
  DollarOutlined,
  EnvironmentOutlined,
  FlagOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { Badge, Card, Divider, Space, Tag, Typography } from "antd";

const { Title, Text, Paragraph } = Typography;

type Props = {
  job: JobItem;
};

export default function DetailJob({ job }: Props) {
  const getTimeAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 24) return "Posted yesterday";
    if (diffInHours < 48) return "Posted 2 days ago";
    return `Posted ${Math.floor(diffInHours / 24)} days ago`;
  };

  const skills: string[] = [
    job.category_title,
    job.secondary_category1_title,
    job.secondary_category2_title,
    job.secondary_category3_title,
    job.secondary_category4_title,
  ].filter((skill): skill is string => Boolean(skill));

  const handleApply = (): void => {
    // Implement apply logic
    // console.log("Apply to job:", job.id);
  };

  const handleSave = (): void => {
    // Implement save logic
    // console.log("Save job:", job.id);
  };

  const handleFlag = (): void => {
    // Implement flag logic
    // console.log("Flag job:", job.id);
  };

  const handleCopyLink = (): void => {
    const link = `https://www.jobsy.dk/jobs/${job.id}`;
    navigator.clipboard.writeText(link);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content - Left Side */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <Card className="shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <Title level={3} className="mb-2!">
                {job.title}
              </Title>
            </div>

            <div className="flex items-center gap-4 text-gray-600 mb-4">
              <span className="flex items-center gap-1">
                <ClockCircleOutlined />
                {getTimeAgo(job.created_at)}
              </span>
              <span className="flex items-center gap-1">
                <EnvironmentOutlined />
                Worldwide
              </span>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-3 mb-4">
              <Text className="text-sm">
                Specialized profiles can help you better highlight your
                expertise when submitting proposals to jobs like these.{" "}
                <a href="#" className="text-green-600 font-medium">
                  Create a specialized profile
                </a>
              </Text>
            </div>

            {/* Summary Section */}
            <div className="mb-6">
              <Title level={5} className="mb-3!">
                Summary
              </Title>
              <Paragraph className="text-gray-700 whitespace-pre-line">
                {job.description}
              </Paragraph>
            </div>

            {/* Budget and Experience Level */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <DollarOutlined className="text-xl" />
                  <Text strong className="text-lg">
                    ${job.budget.toFixed(2)}
                  </Text>
                </div>
                <Text type="secondary" className="text-sm">
                  Fixed-price
                </Text>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge status="default" />
                  <Text strong className="text-lg">
                    Intermediate
                  </Text>
                </div>
                <Text type="secondary" className="text-sm">
                  I am looking for a mix of experience and value
                </Text>
              </div>
            </div>

            <Divider />

            {/* Project Type */}
            <div className="mb-6">
              <Text strong>Project Type: </Text>
              <Text>One-time project</Text>
            </div>

            <Divider />

            {/* Skills Section */}
            <div>
              <Title level={5} className="mb-3!">
                Skills and Expertise
              </Title>
              <Text strong className="block mb-3">
                Mandatory skills
              </Text>
              <Space wrap size={[8, 8]}>
                {skills.map((skill: string, index: number) => (
                  <Tag
                    key={index}
                    className="px-3 py-1 rounded-full bg-gray-100 border-gray-300"
                  >
                    {skill}
                  </Tag>
                ))}
              </Space>
            </div>

            <Divider />

            {/* Activity Section */}
            <div>
              <Title level={5} className="mb-4!">
                Activity on this job
              </Title>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Text type="secondary">Proposals:</Text>
                  <Text strong>10 to 15</Text>
                </div>
                <div className="flex justify-between">
                  <Text type="secondary">Last viewed by client:</Text>
                  <Text strong>6 hours ago</Text>
                </div>
                <div className="flex justify-between">
                  <Text type="secondary">Hires:</Text>
                  <Text strong>1</Text>
                </div>
                <div className="flex justify-between">
                  <Text type="secondary">Interviewing:</Text>
                  <Text strong>10</Text>
                </div>
                <div className="flex justify-between">
                  <Text type="secondary">Invites sent:</Text>
                  <Text strong>21</Text>
                </div>
                <div className="flex justify-between">
                  <Text type="secondary">Unanswered invites:</Text>
                  <Text strong>6</Text>
                </div>
              </div>
            </div>

            <Divider />

            {/* Upgrade Section */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <Text className="text-gray-600">
                Upgrade your membership to see the bid range
              </Text>
            </div>
          </Card>

          {/* Other Jobs by Client */}
          <Card className="shadow-sm mt-5!">
            <Title level={5} className="mb-4!">
              Other open jobs by this Client (2)
            </Title>
            <div className="space-y-3">
              <a href="#" className="block text-green-600 hover:underline">
                Lead Generation Specialist Needed for Targeted Audience Outreach
              </a>
              <Text type="secondary" className="block">
                Fixed-price
              </Text>
            </div>
          </Card>
        </div>

        {/* Sidebar - Right Side */}
        <div className="space-y-4">
          <Card className="shadow-sm">
            <Button
              variant="primary"
              className="w-full mb-3"
              onClick={handleApply}
            >
              Apply now
            </Button>
            <Button
              variant="outline"
              className="w-full mb-3"
              icon={<HeartOutlined />}
              onClick={handleSave}
            >
              Save job
            </Button>
            <div>
              <FlagOutlined className="text-green-600!" />
              <Text
                className="w-full text-green-600! font-medium! ml-1"
                onClick={handleFlag}
              >
                Flag as inappropriate
              </Text>
            </div>

            <Divider />

            <div className="space-y-3">
              <div>
                <Text type="secondary" className="block mb-1">
                  Required Connects to submit a proposal: 7
                </Text>
              </div>
              <div>
                <Text type="secondary" className="block">
                  Available Connects: 0
                </Text>
              </div>
            </div>
          </Card>

          {/* Client Information */}
          <Card className="shadow-sm mt-5!">
            <Title level={5} className="mb-4!">
              About the client
            </Title>

            <div className="space-y-3 mb-4">
              {job.user_has_made_payment_before && (
                <div className="flex items-center gap-2">
                  <CheckCircleFilled className="text-green-500" />
                  <Text className="text-sm">Payment method verified</Text>
                </div>
              )}
              <div className="flex items-center gap-2">
                <CheckCircleFilled className="text-green-500" />
                <Text className="text-sm">Phone number verified</Text>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2">
                <EnvironmentOutlined />
                <Text strong>USA</Text>
              </div>
              <Text type="secondary" className="block">
                {job.zip_title} 10:55 AM
              </Text>
            </div>

            <Divider />

            <div className="space-y-2">
              <Text className="block">3 jobs posted</Text>
              <Text className="block">67% hire rate, 3 open jobs</Text>
            </div>

            <Divider />

            <Text type="secondary" className="text-sm">
              Member since Dec 20, 2025
            </Text>

            <Divider />

            <div>
              <Text strong className="block mb-2">
                Job link
              </Text>
              <div className="bg-gray-100 p-2 rounded flex items-center justify-between">
                <Text className="text-xs truncate" type="secondary">
                  https://www.jobsy.dk/jobs/{job.id}
                </Text>
              </div>
              <Button className="mt-2" onClick={handleCopyLink}>
                Copy link
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
